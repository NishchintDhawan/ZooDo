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
                photoHtml = `${photoHtml}<div class="card col-lg-3 border-primary" id="photo-${imgIndex}">
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

// When the edit button is clicked, the function runs only once
$("#edit-page-btn").one('click', function(){
    // photos
    $("#photo-header").append(`<div class="col-2 pl-0">
                                <button class="btn btn-icon btn-2 btn-primary" type="button" id="add-photos" onclick=addPhoto() data-toggle="modal" data-target="#modal-photo">
                                    <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                                </button>
                            </div>`);
})

// When the edit button is clicked 
$("#edit-page-btn").click(()=>{

    //TODO add button to send changes

    
    //TODO add more edit functions
    editAboutMe()
    editEducation()
    editWorkExperience()
    
})

function editAboutMe() {
    aboutMeHTML = `<textarea rows="4" maxlength="2000" class=" form-control form-control-alternative">${$("#personal-description").html()}</textarea>`;
    $("#aboutMeDesc").empty();
    $("#aboutMeDesc").html(aboutMeHTML);
}

function editEducation() {
   
} 

function editWorkExperience() {
    
    

} 

// BELOW PHOTOS SECTION IS NOT COMPLETED ---
// A global object for storing the pictures
var temp_image_object = [];
var image_object = [];
var temp_image_desc = [];
var image_desc = [];
var is_photo_odd = false;

// $("#add-photos").click(() => {
function addPhoto(){
    $("#add-photo-modal-content").empty();
    $("#add-photo-modal-content").append(
        "<div class=\"modal fade\" id=\"modal-photo\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modal-photo\" data-backdrop=\"static\" data-keyboard=\"false\" aria-hidden=\"true\">"+
        "<div class=\"modal-dialog modal- modal-dialog-centered modal-\" role=\"document\">"+
          "<div class=\"modal-content\">"+
            "<div class=\"modal-header\">"+
                "<h6 class=\"modal-title\" id=\"modal-title-default\">Upload Photos</h6>"+
                "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">"+
                    "<span aria-hidden=\"true\">×</span>"+
                "</button>"+
            "</div>"+
        
            "<div class=\"modal-body\" id=\"modal_body\">"+
              "<div class=\"row\">"+
                "<div class=\"col-sm-4\"></div>"+
                "<div class=\"col-sm-4\">"+
                  "<label for=\"files\" class=\"btn btn-outline-primary\">"+
                      "<span class=\"btn-inner--text\">Browse</span>"+
                      " <span class=\"btn-inner--icon\"><i class=\"ni ni-cloud-upload-96\"></i></span>"+
                  "</label>"+
                  "<input id=\"files\" style=\"display: none\" type=\"file\" accept=\"image/\*\" multiple/>"+
                "</div>"+
                "<div class=\"col-sm-4\"></div>"+
              "</div>"+
            "</div>"+
                
            "<div class=\"modal-footer\" id=\"modal_footer\">"+
                // "<button type=\"button\" class=\"btn btn-outline-primary\" data-dismiss=\"modal\">Cancel</button>"+
                // "<button type=\"button\" class=\"btn btn-outline-primary\" id=\"next-button\" onClick=\"next_button()\">Next</button>"+
            "</div>"+
                
          "</div>"+
          "</div>"+
        "</div>"
    )

    $("#files").change(()=> {
        // Gets an object of images selected

        var numberOfFilesUploaded = document.querySelector('#files').files.length;

        for(var i=0; i<numberOfFilesUploaded; i++){
            temp_image_object[i] = document.querySelector('#files').files[i];

        }
        if($.isEmptyObject(temp_image_object)){
            alert("Please upload a file!");
        }else{
            upload_successful();
            setTimeout(()=> { 
                $("#modal_footer").empty();
                img_desc_temp(); 
                preview_image(); 
                if(temp_image_object.length == 1){
                    img_footer();
                }else{
                    img_desc_foot(); 
                }
            },2000);
        }
    });
// });
}

var next_click = new Boolean(false);
var current = 0;
var next_button = () => {
    next_click = true;
    var image_description = $("#image-description").val();
    // Do we need to make it in an important field?
    if(image_description == ""){
        alert("Please fill out the description!");
    } else{
        image_description = image_description.replace(/\n/g, '<br />');
        temp_image_desc[current] = image_description;
        if(current < temp_image_object.length-1){
            current++;
            $("#modal_footer").empty();
            img_desc_temp();    
            preview_image(); 
            if(current == temp_image_object.length-1){
                img_footer();
            } else {
                img_desc_foot(); 
            }
        } else{
            $("#modal_body").empty();
            $("#modal_footer").empty();
            $("#modal_body").append(
                "<h2>Photos Added Successfully!!</h2>"
            );
            setTimeout(() => {
                $("#modal-default").modal('hide');
                current = 0;
                next_click = false;
                image_desc = image_desc.concat(temp_image_desc);
                image_object = image_object.concat(temp_image_object);
                // Displaying the picture
                showPhotoPreview();
                temp_image_object = [];
                temp_image_desc = [];
            },2000);
        }
    }
}

        
var img_footer = () => {
    if(temp_image_object.length == 1){
        $("#modal_footer").append(
            "<button type=\"button\" class=\"btn btn-outline-primary\" id=\"remove-photo-btn\" onClick=\"remove_photo_button()\">Remove</button>"+
            "<button type=\"button\" class=\"btn btn-outline-primary\" onClick=\"next_button()\" id=\"next-button-img\">Finish</button>"
        );
    } else {
        $("#modal_footer").append(
            "<button type=\"button\" class=\"btn btn-outline-primary\" id=\"prev_photo_button\" onClick=\"prev_photo_button()\">Previous</button>"+
            "<button type=\"button\" class=\"btn btn-outline-primary\" id=\"remove-photo-btn\" onClick=\"remove_photo_button()\">Remove</button>"+
            "<button type=\"button\" class=\"btn btn-outline-primary\" onClick=\"next_button()\" id=\"next-button-img\">Finish</button>"
        );
    }
}

var upload_successful = ()=> {
    $("#modal_body").empty();
    $("#modal_footer").empty();
    $("#modal_body").append(
        "<h2>Media Uploaded Successfully!!</h2>"
    );
};

var img_desc_temp = ()=> {
    $("#modal_body").empty();
    if(temp_image_desc[current] == null){
        $("#modal_body").append(
            "<div class=\"row\">"+
                "<div class=\"col-lg-6\">"+
                    "<img id=\"new-image\" src=\"http://placehold.it/250\" alt=\"your image\" />"+
                "</div>"+           
                "<div class=\"col-lg-6\">"+
                "<div class=\"mobile-margin\">" + "</div>" +      
                    "<textarea id=\"image-description\" rows=\"10\" class=\"form-control form-control-alternative\" placeholder=\"Anything special about the Photo?\"></textarea>"+
                "</div>"+
            "</div>"
        );
    } else {
        $("#modal_body").append(
            "<div class=\"row\">"+
                "<div class=\"col-lg-6\">"+
                    "<img id=\"new-image\" src=\"http://placehold.it/250\" alt=\"your image\" />"+
                "</div>"+
                "<div class=\"col-lg-6\">"+
                    "<textarea id=\"image-description\" rows=\"10\" class=\"form-control form-control-alternative\">"+ temp_image_desc[current] +"</textarea>"+
                "</div>"+
            "</div>"
        );
    }
   
};

var img_desc_foot = () => {
    if(current == 0){
        $("#modal_footer").append(
            "<button type=\"button\" class=\"btn btn-outline-primary\" id=\"remove-photo-btn\" onClick=\"remove_photo_button()\">Remove</button>"+
            "<button type=\"button\" class=\"btn btn-outline-primary\" onClick=\"next_button()\" id=\"next-button-img\">Next</button>"
        );
    } else {
        $("#modal_footer").append(
            "<button type=\"button\" class=\"btn btn-outline-primary\" id=\"prev_photo_button\" onClick=\"prev_photo_button()\">Previous</button>"+
            "<button type=\"button\" class=\"btn btn-outline-primary\" id=\"remove-photo-btn\" onClick=\"remove_photo_button()\">Remove</button>"+
            "<button type=\"button\" class=\"btn btn-outline-primary\" onClick=\"next_button()\" id=\"next-button-img\">Next</button>"
            // "<button type=\"button\" class=\"btn btn-outline-primary\" data-dismiss=\"modal\">Cancel</button>"
        );
    }
};

var preview_image = function(input) {
    var readerImg = new FileReader();
    readerImg.onload = (e)=> {
        $("#new-image").attr('src',e.target.result);
    }
    readerImg.readAsDataURL(temp_image_object[current]);
    next_click = false;
};

var prev_photo_button = ()=> {
    var image_description = $("#image-description").val();
    temp_image_desc[current] = image_description;
    current--;
    if(current < temp_image_object.length-1){
        $("#modal_footer").empty();
        img_desc_temp();    
        preview_image(); 
        img_desc_foot(); 
    }
};

var showPhotoPreview = ()=> {

    // number of rows of current photos
    var numOfCurrRowsOfPhotos = $("#photos-section").children().length - $("#photos-section").find("br").length;
    // number of current photos
    var numOfCurrPhotos = $("#photos-section").children().children().length/2;

    var photoHtml = ``;

    for(var i=0; i<temp_image_object.length; i++){
        photoHtml = `${photoHtml} `;
    }
}
// NOT COMPLETED TILL HERE 
