var profileJSOn;
var introductionJson;

$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = user.uid;

            var dbRefProfile = firebase.database().ref().child("data").child("employee").child("profile").child(userId);
            dbRefProfile.once("value", snap => {
                if(snap.exists()){
                    profileJSOn = snap.val();
                    var dbRefUserInfo = firebase.database().ref().child("data").child("employee").child("userInfo").child(userId);
                    dbRefUserInfo.once("value", snap => {
                        if(snap.exists()){
                            var userInfoJSOn = snap.val();
                            introductionJson = {
                                firstName: userInfoJSOn.firstName,
                                lastName: userInfoJSOn.lastName,
                                profileImg: userInfoJSOn.profileImgData,
                                headline: profileJSOn.personalIntro.headline,
                                personalDescription: profileJSOn.personalIntro.personalDescription
                            }
                            viewNavbarDropMenu(introductionJson)
                            viewIntroduction(introductionJson);
                            viewEducation(profileJSOn.education);
                            viewWorkExperience(profileJSOn.workExperience);
                            viewPhotos(profileJSOn.images);
                            viewVideos(profileJSOn.videos);
                            viewSkills(profileJSOn.skills);
                        }
                    });
                }
            });
        }
    });
});



// Function to view the introduction
function viewIntroduction(introductionJSON){
    // Add the profile picture
    $('#profile-picture').attr("src", introductionJSON.profileImg);
    // Adding name, headline and personal description
    $('#name').html(`${introductionJSON.firstName} ${introductionJSON.lastName}`);
    $('#personal-headline').html(`${introductionJSON.headline}`);

    var personalDescription = introductionJSON.personalDescription.replace(/\n/g, "</br>");
    $('#personal-description').html(`${personalDescription}`);
}
// Function to view the name and profile pic in dropdown menu
function viewNavbarDropMenu(introductionJSON){
    // Adding the profile picture and name respectively
    $("#profilePicDropMenu").attr("src", introductionJSON.profileImg);
    $('#nameDropMenu').html(`${introductionJSON.firstName} ${introductionJSON.lastName}`);
}

// Function to view the Education section
function viewEducation(educationJSON){
    // getting the total number of education
    var totalNumberOfEducation = Object.keys(educationJSON).length;
    // Template string which will store the html of all the education
    var eduHtml = ``;

    // for each education, add the education to the string
    $.each(educationJSON, function(i, education){

        i= i.charAt(i.length-1);
        
        eduHtml = `${eduHtml}<div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-7">
                                <h3 class="mb-0">${education.degreeType} in ${education.courseField}</h3>
                                <h5 class="text-muted">${education.school}</h5>
                            </div>
                            <div class="col-lg-5" style="text-align: right;">
                                <pre><h4>&nbsp;${education.dateOfGraduation}</h4></pre>
                            </div>
                        </div>
                    </div>
                </div>`;
        // there's a line after every education to separate two sections, so we add it here
        if(i != totalNumberOfEducation){
           
            eduHtml = `${eduHtml}<hr style="margin-top:2%; margin-bottom: 4%;"></hr>`;
        }
    });
    // Appending the template literal string to the education section (*** .append() also works in the same way)
    $("#education-fields").html(eduHtml);
}

// Function to view the Work Experience section
function viewWorkExperience(workExperienceJSON){

    // If work experience is not empty
    if(workExperienceJSON != null && workExperienceJSON != {} && workExperienceJSON != undefined){
        // getting the total number of work experiences
        var totalNumberOfWorkExperience = Object.keys(workExperienceJSON).length;
        // Template string which will store the html of all the work experiences
        var html = ``;

        // for each work experience, add the it to the string
        $.each(workExperienceJSON, function(i, work){

            i= i.charAt(i.length-1);

            var workDescription = work.description.replace(/\n/g, "</br>");
            
            html = `${html}<div class="row">
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-lg-7">
                                            <h3 class="mb-0">${work.jobTitle}</h3>
                                            <h5 class="text-muted">${work.companyName}</h5>
                                        </div>
                                        <div class="col-lg-5" style="text-align: right;">
                                            <pre><h4>${work.years}</h4></pre>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <p>${workDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            // there's a line after every work experience to separate two sections, so we add it here
            if(i != totalNumberOfWorkExperience){
                
                html = `${html}<hr style="margin-top:2%; margin-bottom: 4%;"></hr>`;
            }
        });
        // Appending the template literal string to the work experience section (*** .append() also works in the same way)
        $("#work-fields").html(html);
    }
    // If no work experience then remove the work experience section
    else {
        $("#work-fields").parent().parent().parent().remove();
    }
}


// Function to view Skill section
function viewSkills(skillJSON){

    if(skillJSON != null && skillJSON != {} && skillJSON != undefined){
        var totalSkills = Object.keys(skillJSON).length;
        var remainder = totalSkills%2;
        var eachColumn = totalSkills/2
        //dividing skills into 2 columns as designed on frontend
        if(remainder == 0){
            var column1 = eachColumn;
            var column2 = eachColumn;
        }
        else{
            var column1 = Math.ceil(eachColumn);
            var column2 = Math.floor(eachColumn);
        }

        //adding skills
        var skillHtml = ``;
        var num = 1;
        skillHtml = `${skillHtml}<div class="accordion row" id="accordionExample">
                                    <div class ="col-lg-6 container-fluid">`;
        for(i = 0; i < column1; i++){
            var child = "skill" + num;
            skillHtml = `${skillHtml}<div class="card row" id="skill-${num}">
						<div class="card-header" id="heading${num}" data-toggle="collapse" data-target="#collapse${num}" aria-expanded="true" aria-controls="collapse${num}">
							<h4 class="mb-0">${skillJSON[child].skill}</h4>
						</div>
						<div id="collapse${num}" class="collapse" aria-labelledby="heading${num}" data-parent="#accordionExample">
							<div class="card-body">
								<p>${skillJSON[child].description}</p>
							</div>
						</div>
                    </div>
                    <br>`;
            num++;
        }
        skillHtml = `${skillHtml}</div>`;

        skillHtml = `${skillHtml}<div class ="col-lg-6 container-fluid">`;
        for(i = 0; i < column2; i++){
            var child = "skill" + num
            skillHtml = `${skillHtml}<div class="card row" id="skill-${num}">
						<div class="card-header" id="heading${num}" data-toggle="collapse" data-target="#collapse${num}" aria-expanded="true" aria-controls="collapse${num}">
							<h4 class="mb-0">${skillJSON[child].skill}</h4>
						</div>
						<div id="collapse${num}" class="collapse" aria-labelledby="heading${num}" data-parent="#accordionExample">
							<div class="card-body">
								<p>${skillJSON[child].description}</p>
							</div>
						</div>
                    </div>
                    <br>`;
            num++;
        }
        skillHtml = `${skillHtml}</div></div>`;

        // Appending
        $("#skills-section").html(skillHtml);
    }
    // Else remove the skill section
    else {
        $("#skills-section").parent().parent().parent().remove();
    }
}


// function to view the profile photos
function viewPhotos(photoJSON) {
    // if there is a photoJSON or if its not empty or undefined
    if(photoJSON != null && photoJSON != {} && photoJSON != undefined){
        //get the total number of photos
        var totalNumberOfPhotos = Object.keys(photoJSON).length;
        // Template String where the photos are added
        var photoHtml = ``;
        // If there are photos uploaded
        if(totalNumberOfPhotos){
            // Create the start of first row of the photos
            photoHtml = `<div class="row ml-2">`;
            // for each photo, add it to the "photoHtml" string
            $.each(photoJSON, function(keyName, image) {
                // the keyName appears as - "image1, image2, image3 etc", so we just grab the integers from there
                var imgIndex = parseInt(keyName.replace('image',''));

                // Get the URL and description of the image
                var urlSrc = image.url;
                var imgDescription = image.description;

                //TODO change image to iframe to improve UX
                photoHtml = `${photoHtml}<div class="card col-lg-3 border-primary">
                                            <div class="pic-content">
                                                <img class="card-img-top mb-3 mt-3" src="${urlSrc}">
                                                <div class="icons">
                                                    <a onClick="viewImageModal(this)" class="btn-icon btn-secondary" title="View Image" >
                                                        <span class="btn-inner--icon"><i class="far fa-eye"></i></span>
                                                    </a>
                                                    <hr>
                                                    <a onclick="viewImgDescModal(this)" data="${imgDescription}" class="btn-icon btn-secondary" title="View description" >
                                                        <span class="btn-inner--icon"><i class="fas fa-align-justify"></i></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-1"></div>`;
                // If the imgIndex reaches a new row (the current row is filled with 3 photos)
                if(imgIndex % 3 == 0){
                    // Close the row since three photos are already added in the row
                    photoHtml = `${photoHtml}</div>`;
                    // adding a new row when the current one is filled
                    if(imgIndex < totalNumberOfPhotos){
                        photoHtml = `${photoHtml}<br> <div class="row ml-2">`;
                    }
                }
            })
        }
        else {
            photoHtml = `<h3>No Photos.</h3>`;
        }
    // Appending the template literal string to the photos section
    $("#photos-section").html(photoHtml);
    }
    // If there are no photos
    else {
        $("#photos-section").html(`<h3>No Photos.</h3>`);
    }
}

// Function to view the Image in a modal (it gives the source of image to the modal to view the picture)
function viewImageModal(elementRef){
    // Get the url (image source) of the image
    var imgSrc = $($(elementRef).parent().parent().children()[0]).attr('src')
    // Change the modal's image source to the above
    $("#ModalDispPic").attr('src',imgSrc);
    // Adding properties to the icons to view the modal
    $(elementRef).attr('data-toggle','modal');
    $(elementRef).attr('data-target','#viewPicModal');
    $($(elementRef).attr('data-target')).modal('show');
}

// Function to view the Image and description in a modal (it gives the source of image and description to the modal)
function viewImgDescModal(elementRef){
    // Get the url (image source) of the image
    var imgSrc = $($(elementRef).parent().parent().children()[0]).attr('src')
    // Change the modal's image source to the above
    $("#ModalDispDescImg").attr('src',imgSrc);
    // Adding the description to html
    $("#descContainer").html($(elementRef).attr('data').replace(/\n/g, "</br>"));

    // Adding properties to the icons to view the modal
    $(elementRef).attr('data-toggle','modal');
    $(elementRef).attr('data-target','#viewDescModal');
    $($(elementRef).attr('data-target')).modal('show');

}

// Function to view the videos section
function viewVideos(videoJSON){
    // if there is a videoJSON or if its not empty or undefined
    if(videoJSON != null && videoJSON != {} && videoJSON != undefined){
        //total number of videos
        var totalNumberOfVideos = Object.keys(videoJSON).length;
        // template string to add the videos
        var videoHtml = ``;
        // If there are videos present in the videoJSON
        if(totalNumberOfVideos){
            //html content to be appended in html file
            videoHtml = `<div class="row ml-2">`;

            $.each(videoJSON, function(videoKeyName, video){
                var videoIndex = parseInt(videoKeyName.replace('video',''));
                var videoSrc = video.url;

                videoHtml = `${videoHtml}<div class="card col-lg-3 border-primary" style="padding:10px;">
                                            <video style="max-width:100%;" controls>
                                                <source src="${videoSrc}">
                                            </video>
                                        </div>
                                        <div class="col-lg-1"></div>`;
                // var vidSrc = $("source");
                // vidSrc[0].src = URL.createObjectURL(videoSrc);
                // vidSrc.parent().load();
                // source.parent()[0].load();
                if(videoIndex % 3 == 0){
                    videoHtml = `${videoHtml}</div>`;

                    if(videoIndex < totalNumberOfVideos){
                        videoHtml = `${videoHtml}<br> <div class="row ml-2">`;
                    }
                }
            })
        }
        // If there are no videos uploaded
        else{
            videoHtml = `<h3>No Videos.</h3>`
        }
        // Appending the template literal to the videos section
        $("#videos-section").html(videoHtml);
    }
    // if there are no videos
    else {
        $("#videos-section").append(`<h3>No Videos.</h3>`);
    }
}

// When the edit button is clicked
function editPage(){

    //TODO add button to send changes

    //TODO replace the edit button with cancel button

    //TODO add more edit functions

    editAboutMe()
    editEducation()
    editWorkExperience()

}

function editAboutMe() {

}

/*
<option value=\"softwareEngineer\">Software Engineering</option>
                    <option value=\"computerScience\">Computer Science</option>
                    <option value=\"business\">Business</option>
                    <option value=\"etc\">Etc</option> 
*/

function addEducation(educationNumber,courseField, dateOfGraduation,degreeType,school)
{
    var selectedDegree  ;
    var selectedCourse  ; 

    var DegreeEnum = {
        "Diploma": 0,
        "Bachelors": 1,
        "Masters": 2,
        "Etc": 3
    }

    var CourseFieldEnum = {
        "Software Engineering": 0,
        "Computer Science": 1,
        "Business": 2,
        "Etc": 3
    }

    if( (courseField=="") && (degreeType=="")) {        // if a new form is added, then default values are the first values in the forms.
        selectedDegree = 0 ;
        selectedCourse = 0 ;
    }
   else{
    selectedCourse = CourseFieldEnum[courseField];
    selectedDegree = DegreeEnum[degreeType];
    }
    
    console.log(selectedCourse);

    (selectedCourse == 0 ) ? console.log("This should be correct") : console.log("This is wrong");
    

    var addEdu =  
     `<div id = "extra-education-${educationNumber}">
      <br>
      <div id = "education-${educationNumber}">
        <h6 class="heading mb-4 text-center text-primary">Education ${educationNumber}</h6>
          <div class="pl-lg-4">
            <div class="row">`

            addEdu = `${addEdu}
            <div class="col-lg-6">
                <div class="form-group">
                    <label class="form-control-label">Specialization Field</label>                            
                    <select class=\"form-control form-control-alternative extra-education-" + educationInfoNumber + "\">`
            
                    addEdu= (selectedCourse == 0) ? `${addEdu}<option value="Software Engineering" selected>Software Engineering</option>`:`${addEdu}<option value="Software Engineering">Software Engineering</option>`;
                    addEdu= (selectedCourse == 1) ? `${addEdu}<option value="Computer Science" selected>Computer Science</option>`:`${addEdu}<option value="Computer Science">Computer Science</option>`;
                    addEdu = (selectedCourse == 2) ? `${addEdu}<option value="Business" selected>Business</option>`:`${addEdu}<option value="Business">Business</option>`;
                    addEdu = (selectedCourse == 3) ? `${addEdu}<option value="Etc" selected>Etc</option>`:`${addEdu}<option value="Etc">Etc</option>`;
            
            addEdu = `${addEdu} </select>
                        </div>
                    </div>`

            addEdu =   `${addEdu} <div class="col-lg-6" >
                    <div class = "form-group">
                      <label class = "form-control-label">School/University</label>
                        <br>
                      <input type = "textarea" class = "form-control form-control-alternative extra-education-${educationNumber}" placeholder="School or University" value = "${school}" >
                    </div>
                </div>`

    
            addEdu = `${addEdu}
                <div class="col-lg-6">
                        <div class="form-group">
                        <label class="form-control-label">Degree</label>
                        <select class=\"form-control form-control-alternative extra-education-" + educationInfoNumber + "\">`
                        addEdu= (selectedDegree == 0) ? `${addEdu}<option value="Diploma" selected>Diploma</option>`:`${addEdu}<option value="Diploma">Diploma</option>`;
                        addEdu= (selectedDegree == 1) ? `${addEdu}<option value="Bachelors" selected>Bachelors</option>`:`${addEdu}<option value="Bachelors">Bachelors</option>`;
                        addEdu = (selectedDegree == 2) ? `${addEdu}<option value="Masters" selected>Masters</option>`:`${addEdu}<option value="Masters">Masters</option>`;
                        addEdu = (selectedDegree == 3) ? `${addEdu}<option value="Etc" selected>Etc</option>`:`${addEdu}<option value="Etc">Etc</option>`;
                        
                addEdu = `${addEdu} </select>
                        </div>
                    </div>`
                        
                addEdu = `${addEdu}      
                        <div class="col-lg-6">
                            <div class = "form-group">
                              <label class = "form-control-label">Date of Graduation</label>
                                <br>
                              <input type = "date" class = "form-control form-control-alternative extra-education-${educationNumber}" placeholder="Graduation Date" value = "${dateOfGraduation}" >
                            </div>
                        </div>
        
                      </div>
                    </div>
                </div>
              </div>`;
        

        return addEdu;

}


function editEducation() {


    educationJSON =  profileJSOn.education;
  // getting the total number of education qualifications
  var totalNumberOfEducation = Object.keys(educationJSON).length;
  // Template string which will store the html of all the education forms
  var eduHtml =  ``;
  

  eduHtml = `${eduHtml} <div id = "education-container">`;
  // for each education qualification, add the education to the string
  $.each(educationJSON, function(i, education){

    var courseField = education.courseField;
    var dateOfGraduation = education.dateOfGraduation;
    var degreeType = education.degreeType;
    var school = education.school;
    
    $("#education-fields").empty()

    var educationNumber = i.replace("education", ""); //gets the education number from the database using the educationJSON.

      eduHtml =   `${eduHtml}` + addEducation(educationNumber, courseField,dateOfGraduation,degreeType,school);
      // there's a line after every education to separate two sections, so we add it here

  });

 eduHtml =   `${eduHtml}</div>`


  eduHtml = `${eduHtml} <div id="add-extra-work-experience-buttons">

                          <button class="btn btn-icon btn-2 btn-primary" type="button" onclick="addExtraEducation()" >
                            <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                          </button>

                          <button class="btn btn-icon btn-2 btn-danger" type="button" id="remove-extra-education" onclick="removeExtraEducation()">
                            <span class="btn-inner--icon"><i class="ni ni-fat-delete"></i></span>
                          </button>
                        </div>`;

//  if(i != totalNumberOfEducation){
//      eduHtml = `${eduHtml}<hr style="margin-top:2%; margin-bottom: 4%;"></hr>`;
//  }

  // Appending the template literal string to the education section (*** .append() also works in the same way)
  $("#education-fields").html(eduHtml);
}

function addExtraEducation() {
  var totalNumberOfEducation = $("#education-container").children().length +1//+ 1;
  if(totalNumberOfEducation>0){
      document.getElementById("remove-extra-education").removeAttribute("style");
      document.getElementById("remove-extra-education").setAttribute("style", "display: inline-block;");
  }
  var addEduHtml = ``;
  addEduHtml  = `${addEduHtml}`+ addEducation(totalNumberOfEducation,"","","","");
  $("#education-container").append(addEduHtml);
}

function removeExtraEducation() {
  var totalNumberOfEducation = $("#education-container").children().length    // get the last education children and remove.
  var removeid = "#extra-education-" + totalNumberOfEducation;

  $(removeid).remove();

    if($("#education-container").children().length==0){
        document.getElementById("remove-extra-education").removeAttribute("style");
        document.getElementById("remove-extra-education").setAttribute("style", "display: none;");
    }

}

function editWorkExperience() {

    //Make a DOM ready to take new template
    $("#work-fields").empty();

    var years = {
        "Less than 1 year": 0,
        "1 year": 1,
        "2 years": 2,
        "3 years": 3,
        "4 years": 4,
        "5 years": 5,
        "More than 5 years": 6

    }

    //get workExp json
    var workExperienceJSON = profileJSOn.workExperience;
    // getting the total number of work experiences
    var totalNumberOfWorkExperience = Object.keys(workExperienceJSON).length;
    // Template string which will store the html of all the work experiences
    var html = ``;

    html = `${html} <div id="work-experience-container">`;

    $.each(workExperienceJSON, function(i, work){

        var workDescription = work.description.replace("</br>", /\n/g);
        var workExperienceNumber = i.replace("workExperience", "");
        var selectedYear = years[work.years];
        
        html = `${html} <div id="extra-work-experience-${workExperienceNumber}">
                            <br>
                            <div id="work-experience-${workExperienceNumber}">
                                <h6 class="heading mb-4 text-center text-primary">Work Experience ${workExperienceNumber}</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                    <div class="col-lg-5">
                                        <div class="form-group">
                                        <label class="form-control-label">Company Name</label>
                                        <input type="text" id="" class="form-control form-control-alternative extra-work-experience-${workExperienceNumber}" placeholder="Company Name" value="${work.companyName}">
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="form-group">
                                        <label class="form-control-label">Job Title</label>
                                        <input type="text" id="" class="form-control form-control-alternative extra-work-experience-${workExperienceNumber}" placeholder=\"Job Title\" value="${work.jobTitle}">
                                        </div>
                                    </div>
                                    <div class="col-lg-2">
                                        <div class="form-group">
                                        <label class="form-control-label">Years</label>
                                        <select class="form-control form-control-alternative extra-work-experience-${workExperienceNumber}">`;
                                            html = (selectedYear == 0) ? `${html}<option value="Less than 1 year" selected>< a year</option>`:`${html}<option value="Less than 1 year">< a year</option>`;
                                            html = (selectedYear == 1) ? `${html}<option value="1 year" selected>1 year</option>`:`${html}<option value="1 year">1 year</option>`;
                                            html = (selectedYear == 2) ? `${html}<option value="2 year" selected>2 year</option>`:`${html}<option value="2 year">2 year</option>`;
                                            html = (selectedYear == 3) ? `${html}<option value="3 year" selected>3 year</option>`:`${html}<option value="3 year">3 year</option>`;
                                            html = (selectedYear == 4) ? `${html}<option value="4 year" selected>4 year</option>`:`${html}<option value="4 year">4 year</option>`;
                                            html = (selectedYear == 5) ? `${html}<option value="5 year" selected>5 year</option>`:`${html}<option value="5 year">5 year</option>`;
                                            html = (selectedYear == 6) ? `${html}<option value="More than 5 years" selected>> 5 years</option>`:`${html}<option value="More than 5 years">> 5 years</option>`;
                        html = `${html} </select>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                        <label class="form-control-label\">Job Description</label>
                                        <textarea rows="8" class="form-control form-control-alternative extra-work-experience-${workExperienceNumber}" placeholder="Describe your work in few words ...">${workDescription}</textarea>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    });

    html = `${html}</div>`


    html = `${html}<div id="add-extra-work-experience-buttons">
                        <button class="btn btn-icon btn-2 btn-primary" type="button" onclick="addExtraWorkExperience()" >
                            <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                        </button>
                        <button class="btn btn-icon btn-2 btn-danger" type="button" id="remove-extra-work-experience" onclick="removeExtraWorkExperience()">
                            <span class="btn-inner--icon"><i class="ni ni-fat-delete"></i></span>
                        </button>
                    </div>`;

    // Appending the template literal string to the work experience section (*** .append() also works in the same way)
    $("#work-fields").html(html);
}


//This function is called when "+" button is pressed.
//This function will add extra work information form for a user
function addExtraWorkExperience() {
    //this line will check in div block of html, and add 1 for next children
    var workExperienceNumber = $("#work-experience-container").children().length + 1;

    var html = ``;

    //this is dynamic addition of content to html from js
    html = `${html}<div id="extra-work-experience-${workExperienceNumber}">
                            <br>
                            <div id="work-experience-${workExperienceNumber}">
                                <h6 class="heading mb-4 text-center text-primary">Work Experience ${workExperienceNumber}</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                    <div class="col-lg-5">
                                        <div class="form-group">
                                        <label class="form-control-label">Company Name</label>
                                        <input type="text" id="" class="form-control form-control-alternative extra-work-experience-${workExperienceNumber}" placeholder="Company Name">
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="form-group">
                                        <label class="form-control-label">Job Title</label>
                                        <input type="text" id="" class="form-control form-control-alternative extra-work-experience-${workExperienceNumber}" placeholder=\"Job Title\">
                                        </div>
                                    </div>
                                    <div class="col-lg-2">
                                        <div class="form-group">
                                        <label class="form-control-label">Years</label>
                                        <select class="form-control form-control-alternative extra-work-experience-${workExperienceNumber}">
                                            <option value="Less than 1 year">< a year</option>
                                            <option value="1 year">1 year</option>
                                            <option value="2 years">2 years</option>
                                            <option value="3 years">3 years</option>
                                            <option value="4 years">4 years</option>
                                            <option value="5 years">5 years</option>
                                            <option value="More than 5 years">> 5 years</option>
                                        </select>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                        <label class="form-control-label\">Job Description</label>
                                        <textarea rows="8" class="form-control form-control-alternative extra-work-experience-${workExperienceNumber}" placeholder="Describe your work in few words ..."></textarea>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

    // Appending the template literal string to the work experience section (*** .append() also works in the same way)
    $("#work-experience-container").append(html);

    //check if their is any extra education form if no then remove button which was added to hide extra education form
    if($("#work-experience-container").children().length > 0) {
        document.getElementById("remove-extra-work-experience").removeAttribute("style");
        document.getElementById("remove-extra-work-experience").setAttribute("style", "display: inline-block;");
    }
}

//this function is called when remove extra work info button is pressed
function removeExtraWorkExperience() {
    //check total number of extra education info forms and making id name to remove last form
    var totalNumberOfWorkExperienceRecord = $("#work-experience-container").children().length;
    var idName = "#extra-work-experience-" + totalNumberOfWorkExperienceRecord;

    //remove last extra education form
    $(idName).remove();

    //check if their is any extra education form if no then remove button which was added to hide extra education form
    if($("#work-experience-container").children().length == 0) {
        document.getElementById("remove-extra-work-experience").removeAttribute("style");
        document.getElementById("remove-extra-work-experience").setAttribute("style", "display: none;");
    }

    
}
