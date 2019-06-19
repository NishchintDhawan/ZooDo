$(document).ready(function() {
    // stores the first name
    var firstName = "";

    firebase.auth().onAuthStateChanged(function(user) {
        // if user is logged in
        if(user){
            // get user's uid
            var userID = user.uid;

            var firstNameRef = firebase.database().ref().child("data").child("employee").child("userInfo").child(userID).child("firstName");

            firstNameRef.once('value',function(snap) {
                firstName = snap.val();
                // Add the welcome statement to html 
                $("#personalIntro").prepend("<h1 class=\"display-2 text-white\">Hello "+firstName+"</h1>");
            });
        }
    })
});


//This function is called when "+" button is pressed.
//This function will add extra education information form for a user
$("#add-extra-education").click(function() {
    //this line will check in div block of html, how many form already exsists
    var educationInfoNumber = $("#extra-education").children().length + 2;
    //this is dynamic addition of content to html from js
    $("#extra-education").append(
        "<div id=\"extra-education-" + educationInfoNumber + "\">" + //adding different id for every info form so we can delete it
            "<br>"+
            "<h6 class=\"heading mb-4 text-center text-primary\">Education Information " + educationInfoNumber + "</h6>"+
            "<div class=\"pl-lg-4\">"+
                "<div class=\"row\">"+
                "<div class=\"col-lg-6\">"+
                    "<div class=\"form-group\">"+
                    "<label class=\"form-control-label\" for=\"input-username\">School/University</label>"+
                    "<input type=\"text\" id=\"\" class=\"form-control form-control-alternative extra-education-" + educationInfoNumber + "\" placeholder=\"School/University\">"+
                    "</div>"+
                "</div>"+
                "<div class=\"col-lg-6\">"+
                    "<div class=\"form-group\">"+
                    "<label class=\"form-control-label\" for=\"input-email\">Degree Type</label>"+
                    "<select class=\"form-control form-control-alternative extra-education-" + educationInfoNumber + "\">"+
                        "<option value=\"diploma\">Diploma</option>"+
                        "<option value=\"bachelors\">Bachelors</option>"+
                        "<option value=\"master\">Masters</option>"+
                        "<option value=\"etc\">Etc</option>"+
                    "</select>"+
                    "</div>"+
                "</div>"+
                "</div>"+
                "<div class=\"row\">"+
                "<div class=\"col-lg-6\">"+
                    "<div class=\"form-group\">"+
                    "<label class=\"form-control-label\" for=\"input-first-name\">Course Field</label>"+
                    "<select class=\"form-control form-control-alternative extra-education-" + educationInfoNumber + "\">"+
                        "<option value=\"softwareEngineer\">Software Engineer</option>"+
                        "<option value=\"computerScience\">Computer Science</option>"+
                        "<option value=\"business\">Business</option>"+
                        "<option value=\"etc\">Etc</option>"+
                    "</select>"+
                    "</div>"+
                "</div>"+
                "<div class=\"col-lg-6\">"+
                    "<div class=\"form-group\">"+
                    "<label class=\"form-control-label\" for=\"input-last-name\">Date of Graduation</label>"+
                    "<input type=\"date\" id=\"CompletionDate\" class=\"form-control form-control-alternative extra-education-" + educationInfoNumber + "\">"+
                    "</div>"+
                "</div>"+
                "</div>"+
            "</div>"+
        "</div>"
    );

    //we make remove info form button visible if we have any extra info form available
    if($("#extra-education").children().length > 0){
        document.getElementById("remove-extra-education").removeAttribute("style");
        document.getElementById("remove-extra-education").setAttribute("style", "display: inline-block;");
    }
});

//this function is called when remove extra eduacation info button is pressed 
$("#remove-extra-education").click(function() {
    //check total number of extra education info forms and making id name to remove last form
    var totalNumberOfEducationRecord = $("#extra-education").children().length + 1;
    var idName = "#extra-education-" + totalNumberOfEducationRecord;

    //remove last extra education form
    $(idName).remove();

    //check if their is any extra education form if no then remove button which was added to hide extra education form
    if($("#extra-education").children().length == 0) {
        document.getElementById("remove-extra-education").removeAttribute("style");
        document.getElementById("remove-extra-education").setAttribute("style", "display: none;");
    }
});


//This function is called when "+" button is pressed.
//This function will add extra work information form for a user
$("#add-extra-work-experience").click(function() {
    //this line will check in div block of html, how many form already exsists
    var workInfoNumber = $("#extra-work-experience").children().length + 2;
    //this is dynamic addition of content to html from js
    $("#extra-work-experience").append(
        "<div id=\"extra-work-experience-" + workInfoNumber + "\">" + //adding different id for every info form so we can delete it
            "<br>"+
            "<h6 class=\"heading-small text-muted mb-4\">Work Experience</h6>"+
            "<div id=\"work-experience-1\">"+
                "<h6 class=\"heading mb-4 text-center text-primary\">Work Experience " + workInfoNumber + "</h6>"+
                "<div class=\"pl-lg-4\">"+
                    "<div class=\"row\">"+
                    "<div class=\"col-lg-5\">"+
                        "<div class=\"form-group\">"+
                        "<label class=\"form-control-label\">Company Name</label>"+
                        "<input type=\"text\" id=\"\" class=\"form-control form-control-alternative extra-work-experience-" + workInfoNumber + "\" placeholder=\"Company Name\">"+
                        "</div>"+
                    "</div>"+
                    "<div class=\"col-lg-5\">"+
                        "<div class=\"form-group\">"+
                        "<label class=\"form-control-label\">Job Title</label>"+
                        "<input type=\"text\" id=\"\" class=\"form-control form-control-alternative extra-work-experience-" + workInfoNumber + "\" placeholder=\"Job Title\">"+
                        "</div>"+
                    "</div>"+
                    "<div class=\"col-lg-2\">"+
                        "<div class=\"form-group\">"+
                        "<label class=\"form-control-label\">Years</label>"+
                        "<select class=\"form-control form-control-alternative extra-work-experience-" + workInfoNumber + "\">"+
                            "<option value=\"Less than 1 year\">< a year</option>"+
                            "<option value=\"1 year\">1 year</option>"+
                            "<option value=\"2 years\">2 years</option>"+
                            "<option value=\"3 years\">3 years</option>"+
                            "<option value=\"4 years\">4 years</option>"+
                            "<option value=\"5 years\">5 years</option>"+
                            "<option value=\"More than 5 years\">> 5 years</option>"+
                        "</select>"+
                        "</div>"+
                    "</div>"+
                    "</div>"+
                    "<div class=\"row\">"+
                    "<div class=\"col-lg-12\">"+
                        "<div class=\"form-group\">"+
                        "<label class=\"form-control-label\">Job Discription</label>"+
                        "<textarea rows=\"4\" class=\"form-control form-control-alternative extra-work-experience-" + workInfoNumber + "\" placeholder=\"Discribe your work in few words ...\"></textarea>"+
                        "</div>"+
                    "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>"
    );

    //we make remove info form button visible if we have any extra info form available
    if($("#extra-work-experience").children().length > 0){
        document.getElementById("remove-extra-work-experience").removeAttribute("style");
        document.getElementById("remove-extra-work-experience").setAttribute("style", "display: inline-block;");
    }
});

//this function is called when remove extra work info button is pressed 
$("#remove-extra-work-experience").click(function() {
    //check total number of extra education info forms and making id name to remove last form
    var totalNumberOfWorkExperienceRecord = $("#extra-work-experience").children().length + 1;
    var idName = "#extra-work-experience-" + totalNumberOfWorkExperienceRecord;

    //remove last extra education form
    $(idName).remove();

    //check if their is any extra education form if no then remove button which was added to hide extra education form
    if($("#extra-work-experience").children().length == 0) {
        document.getElementById("remove-extra-work-experience").removeAttribute("style");
        document.getElementById("remove-extra-work-experience").setAttribute("style", "display: none;");
    }
});

/*
    Profile Picture Crop Feature - Utkarsh and Shrey
*/  
// Croppie object which will allow us to crop the image
var cropImage;
// Profile Picture data which is sent to firebase
var profilePicture;

$(document).on("change", "#upload_profile_pic", function() {
    // Clear the contents of main-cropper-container and add a new container for cropping images every time we upload a new picture
    $("#main-cropper-container").empty();
    $("#main-cropper-container").append("<div id=\"main-cropper\"> </div>");

    // Get the ID of input image
    var input = document.querySelector("#profile_img");

    // If file is selected
    if (input.files && input.files[0]) {
        
        // First image from the file object
        var profile_img = input.files[0]

        // New croppie object giving the cropping properties 
        cropImage = new Croppie(document.getElementById('main-cropper'),{
            viewport: { width: 250, height: 250 , type:"circle"},
            boundary: { width: 300, height: 300 },
            showZoomer: true,
        });
        
        var readerProfileImg = new FileReader();
        // When the image is loaded, bind it to the crop layout
        readerProfileImg.onload = function (e) {
            cropImage.bind( {
                url: e.target.result
            });
        }
        // Reading the image contents
        readerProfileImg.readAsDataURL(profile_img);
    }

});

$("#save_profile_img").click(function() {
    // Displaying the cropped profile photo
    cropImage.result("base64").then(function(dataImg) {
        // Save the base64 data of the image in profilePicture variable which is sent to database
        profilePicture = dataImg;
        $('#profile-photo').attr('src', dataImg);
    })
    // Hide the modal when we upload the profile picture
    $("#upload_profile_pic").modal("hide");

});


var skill_name_arr =[];
var skill_desc_arr = [];
var skill_num_arr = [];
// For storing the total number of skills
var total_number_of_skills = 1;
var number_of_sub_skills;
var number_of_skills;
$("#add-skill").click(function(){
    number_of_skills = ($("#all-skills").children().length) / 2;
    var sub_skill_string = "#sub-skills-"+number_of_skills;
    number_of_sub_skills = $(sub_skill_string).children().length;

    var temp_number_of_skills;
    if(number_of_skills != 0) {
        temp_number_of_skills = number_of_skills-1;
    } else {
        temp_number_of_skills = number_of_skills;
    }

    var skill_name = $("#skill-name").val();
    var skill_desc = $("#skill-description").val();


    if(skill_name == "" && skill_desc == ""){
        alert("Please fill in the required field to add a skill!");
    }
    else if(skill_name == "" || (!skill_name.replace(/\s/g, '').length)){
        alert("Please fill in the Skill Name to add a skill!");
        document.getElementById("skill-description").value = "";
    } 
    else{
        skill_desc = skill_desc.replace(/\n/g, '<br />');
        skill_name_arr[skill_name_arr.length] = skill_name;
        skill_desc_arr[skill_desc_arr.length] = skill_desc;
        skill_num_arr[skill_num_arr.length] = total_number_of_skills;

        if(((temp_number_of_skills*3)+number_of_sub_skills) % 3 != 0) {
            $(sub_skill_string).append(
                "<div class=\"col-lg-4\"  id=\"skill-"+total_number_of_skills+"\">"+
                    "<div class=\"card bg-gradient-default card-stats mb-4 mb-xl-0\">"+
                        "<div class=\"card-body\">"+
                            "<div class=\"row mb-4\">"+
                                "<div class=\"col-12\">"+
                                    "<h3 class=\"card-title text-white\" style=\"text-align: center; letter-spacing: 0.2em;\"><b>"+skill_name+"</b></h3>"+
                                    "<hr style=\"border-top: 1px solid #ffffff; margin: 1em 0;\"></hr>"+
                                    "<small class=\"text-white\">"+skill_desc+"</small>"+
                                "</div>"+
                            "</div>"+
                            "<div class=\"row\" style=\"text-align: center;\">"+
                                "<div class=\"col-12\">"+
                                    "<button type=\"button\" class=\"btn btn-sm btn-danger\" id=\"remove-skill\" onclick = remove_skill("+total_number_of_skills+")>Remove</button>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"
            );
        } else {
            var sub_skill = "sub-skills-"+((number_of_skills)+1);
            $("#all-skills").append(
                "<div class=\"row\" id=\""+sub_skill +"\">"+
                    "<div class=\"col-lg-4\"  id=\"skill-"+total_number_of_skills+"\">"+
                        "<div class=\"card bg-gradient-default card-stats mb-4 mb-xl-0\">"+
                            "<div class=\"card-body\">"+
                                "<div class=\"row mb-4\">"+
                                    "<div class=\"col-12\">"+
                                        "<h3 class=\"card-title text-white\" style=\"text-align: center; letter-spacing: 0.2em;\"><b>"+skill_name+"</b></h3>"+
                                        "<hr style=\"border-top: 1px solid #ffffff; margin: 1em 0;\"></hr>"+
                                        "<small class=\"text-white\">"+skill_desc+"</small>"+
                                    "</div>"+
                                "</div>"+
                                "<div class=\"row\" style=\"text-align: center;\">"+
                                    "<div class=\"col-12\">"+
                                        "<button type=\"button\" class=\"btn btn-sm btn-danger\" id=\"remove-skill\" onclick = remove_skill("+total_number_of_skills+")>Remove</button>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
                "<br>"
            );
        }
        document.getElementById("skill-name").value = "";
        document.getElementById("skill-description").value = "";
        total_number_of_skills++;
    }
});

function remove_skill(num_of_skill) {
    // for removing skills in order
    var id_last = $("#skill-"+num_of_skill).parent().attr('id');
    $("#skill-"+num_of_skill).remove();
    var id_last_num = id_last.replace("sub-skills-",'');
    var next_id_num = parseInt(id_last_num)+1;
    var total_skills = ($("#all-skills").children().length)/2;
    for(i = next_id_num; i <= total_skills; i++){
        var curr = i-1;
        var curr_id_name = "#sub-skills-"+curr;
        var next_id_name = "#sub-skills-"+i;
        var next_skill_id = $(next_id_name).children(":first").attr("id");
        $('#' + next_skill_id).appendTo(curr_id_name);
    }

    if($('#sub-skills-'+total_skills).children().length == 0){
        $('#sub-skills-'+total_skills).next('br').remove();
        $('#sub-skills-'+total_skills).remove();
        total_skills--;
    }
    
     // for appropriately removing skills from the skill, description, skill number array
     var index_to_delete = skill_num_arr.indexOf(num_of_skill)
    if (index_to_delete != -1){
        skill_num_arr.splice(index_to_delete,1);
        skill_name_arr.splice(index_to_delete,1);
        skill_desc_arr.splice(index_to_delete,1);
    }
}

// For updating the headline when you click update headline button 
$("#update-headline").click(function() {
    var headline = $("#headline-input").val();
    // console.log(headline);
    if(headline == "" || (!headline.replace(/\s/g, '').length)){
        alert("Please fill in the headline box.");
    } else {
        $("#headline").text(headline);
        document.getElementById("headline-input").value = ""; 
    }
});

// For updating the headline when you press enter after writing your headline
$("#headline-input").keypress(function(event){
    if(event.keyCode == 13){
        $("#update-headline").click();
    }
});

// A global object for storing the pictures
var temp_image_object = [];
var image_object = [];
var temp_image_desc = [];
var image_desc = [];
var is_photo_odd = false;

$("#add-photo-btn").click(function() {
    $("#modal-content").empty();
    $("#modal-content").append(
        "<div class=\"modal fade\" id=\"modal-default\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modal-default\" data-backdrop=\"static\" data-keyboard=\"false\" aria-hidden=\"true\">"+
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

    $("#files").change(function() {
        // Gets an object of images selected

        var numberOfFilesUploaded = document.querySelector('#files').files.length;

        for(var i=0; i<numberOfFilesUploaded; i++){
            temp_image_object[i] = document.querySelector('#files').files[i];

        }
        if($.isEmptyObject(temp_image_object)){
            alert("Please upload a file!");
        }else{
            upload_successful();
            setTimeout(function() { 
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
});

var next_click = new Boolean(false);
var current = 0;
function next_button() {
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
            setTimeout(function(){
                $("#modal-default").modal('hide');
                current = 0;
                next_click = false;
                image_desc = image_desc.concat(temp_image_desc);
                image_object = image_object.concat(temp_image_object);
                show_preview();
                temp_image_object = [];
                temp_image_desc = [];
            },2000);
        }
    }
}

function show_preview() {

    var temp_image_object_len = temp_image_object.length;
    var next_sub_photo;
    var i;
    var rowNumber;
    var was_previous_odd = false;
    var create_new_row = true;
    if(is_photo_odd) {
        
        next_sub_photo = $("#add-photos").children().length;
        rowNumber = next_sub_photo;
        var rowName = "#row-" + rowNumber;
        rowNumber++;
        i=1;

        $(rowName).append("<div class=\"col-lg-6\">"+
                                "<div class=\"card\" style=\"width: 12rem auto;\">"+
                                    "<img class=\"card-img-top\" src=\"" + URL.createObjectURL(temp_image_object[0]) + "\" alt=\"Card image cap\">"+
                                    "<div class=\"card-body\">"+
                                        "<p class=\"card-text\">" + temp_image_desc[0] + "</p>"+
                                        "<div class=\"col-auto\">"+
                                            "<button type=\"button\" class=\"btn btn-sm btn-danger\" onclick = delete_photo(this)>Delete</button>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>");

        was_previous_odd = true;

    } else { 
        
        next_sub_photo = $("#add-photos").children().length + 1;
        rowNumber = next_sub_photo;
        i=0;
    
    }
    
    var html = "";

    if(temp_image_object_len % 2 !=0) { 
        if(was_previous_odd) {
            is_photo_odd = false; 
        } else{
            is_photo_odd = true; 
        }
    } else { 
        if(was_previous_odd) {
            is_photo_odd = true; 
        } else{
            is_photo_odd = false; 
        } 
    }  //logic for odd+odd=even and odd+even=odd etc

    for(; i<temp_image_object_len; i++){

        if((i%2 == 0 || was_previous_odd) && create_new_row) {
            var rowName = "row-" + rowNumber;
            var containerName = "container-" + rowNumber;
            if(next_sub_photo == 1 && $("#add-photos").children().length == 0) {

                if(temp_image_object_len > 2){
                    $("#carouselExampleControls").append("<a class=\"carousel-control-prev\" href=\"#carouselExampleControls\" role=\"button\" data-slide=\"prev\">"+
                                                            "<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>"+
                                                            "<span class=\"sr-only\">Previous</span>"+
                                                        "</a>"+
                                                        "<a class=\"carousel-control-next\" href=\"#carouselExampleControls\" role=\"button\" data-slide=\"next\">"+
                                                            "<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>"+
                                                            "<span class=\"sr-only\">Next</span>"+
                                                        "</a>");
                }
                html = html + "<div class=\"carousel-item active\" id=\""+ containerName +"\">" +
                    "<div class=\"row\" id=\""+ rowName +"\">"+
                        "<div class=\"col-lg-6\">"+
                            "<div class=\"card\" style=\"width: 12rem auto;\">"+
                                "<img class=\"card-img-top\" src=\"" + URL.createObjectURL(temp_image_object[i]) + "\" alt=\"Card image cap\">"+
                                "<div class=\"card-body\">"+
                                    "<p class=\"card-text\">" + temp_image_desc[i] + "</p>"+
                                    "<div class=\"col-auto\">"+
                                        "<button type=\"button\" class=\"btn btn-sm btn-danger\" onclick = delete_photo(this)>Delete</button>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>";
                next_sub_photo++;
            } else {

                if($("#carouselExampleControls").children().length < 2) {
                    $("#carouselExampleControls").append("<a class=\"carousel-control-prev\" href=\"#carouselExampleControls\" role=\"button\" data-slide=\"prev\">"+
                                                            "<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>"+
                                                            "<span class=\"sr-only\">Previous</span>"+
                                                        "</a>"+
                                                        "<a class=\"carousel-control-next\" href=\"#carouselExampleControls\" role=\"button\" data-slide=\"next\">"+
                                                            "<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>"+
                                                            "<span class=\"sr-only\">Next</span>"+
                                                        "</a>");
                }

                html = html + "<div class=\"carousel-item\" id=\""+ containerName +"\">" +
                                "<div class=\"row\" id=\""+ rowName +"\">"+
                                    "<div class=\"col-lg-6\">"+
                                        "<div class=\"card\" style=\"width: 12rem auto;\">"+
                                            "<img class=\"card-img-top\" src=\"" + URL.createObjectURL(temp_image_object[i]) + "\" alt=\"Card image cap\">"+
                                            "<div class=\"card-body\">"+
                                                "<p class=\"card-text\">" + temp_image_desc[i] + "</p>"+
                                                "<div class=\"col-auto\">"+
                                                    "<button type=\"button\" class=\"btn btn-sm btn-danger\" onclick = delete_photo(this)>Delete</button>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>";
            }
            rowNumber++;
            create_new_row = false;
        } else {

            html = html + "<div class=\"col-lg-6\">"+
                            "<div class=\"card\" style=\"width: 12rem auto;\">"+
                                "<img class=\"card-img-top\" src=\"" + URL.createObjectURL(temp_image_object[i]) + "\" alt=\"Card image cap\">"+
                                "<div class=\"card-body\">"+
                                    "<p class=\"card-text\">" + temp_image_desc[i] + "</p>"+
                                    "<div class=\"col-auto\">"+
                                        "<button type=\"button\" class=\"btn btn-sm btn-danger\" onclick = delete_photo(this)>Delete</button>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>";
            create_new_row = true;
        }

    }

    if(is_photo_odd){
        html = html + "</div></div>";
    }

    $("#add-photos").append(html);

    if(rowName !=  "#row-1"){
        $(".carousel-control-prev-icon").show();
        $(".carousel-control-next-icon").show(); 
        
    }


}
        
function img_footer() {
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
        )
    }
}

function upload_successful() {
    $("#modal_body").empty();
    $("#modal_footer").empty();
    $("#modal_body").append(
        "<h2>Media Uploaded Successfully!!</h2>"
    );
}

function img_desc_temp() {
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

function img_desc_foot() {
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
}

var preview_image = function(input) {
    var readerImg = new FileReader();
    readerImg.onload(function(e) {
        $("#new-image").attr('src',e.target.result);
    });
    readerImg.readAsDataURL(temp_image_object[current]);
    next_click = false;
};

function prev_photo_button() {
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


/* 
    Delete photo - DC
*/
function delete_photo(element) {
    var total_rows = $("#add-photos").children().length;
    var delete_photo_row = $(element).parent().parent().parent().parent().parent();
    var delete_photo_rowID = delete_photo_row.attr('id');
    var delete_photo_rowID_num = delete_photo_rowID.replace("row-",'');
    var next_rowID_num = parseInt(delete_photo_rowID_num)+1;
    var prev_rowID_num = parseInt(delete_photo_rowID_num)-1;
    
    //deleting the image and desc from the global arrays
    //if it is the first photo in the row 
    if (delete_photo_row.children()[0] == $(element).parent().parent().parent().parent()[0]){
        var imageToBeDeleted = ((delete_photo_rowID_num-1)*2) + 1 ;
    }
    else{
        var imageToBeDeleted = ((delete_photo_rowID_num-1)*2) + 2 ;
    }
    image_object.splice(imageToBeDeleted-1, 1);
    image_desc.splice(imageToBeDeleted-1,1);


    //If deleting from the last row
    if(delete_photo_rowID_num == total_rows){
        //if the last row has only one photo, then make the row before if active before deleting that element
        if(($('#row-'+total_rows).children().length == 1) || (total_rows == 1)){
            $("#container-"+prev_rowID_num).addClass('active');
            $(element).parent().parent().parent().parent().remove();
            // dont remove the container if there is one photo in container 1
            if(!((total_rows == 1) && ($('#row-'+total_rows).children().length == 1))){
                $('#container-'+total_rows).remove();
                total_rows--;
            }
       }
       else{
            $(element).parent().parent().parent().parent().remove();
       }
    }
    else{
        // For shifting all elements by 1 to fill the gap
        $(element).parent().parent().parent().parent().remove();
        for(i = next_rowID_num; i<=total_rows; i++){
            var curr = i-1;
            var curr_rowID = "row-" + curr;
            var next_rowID = "row-" + i;
            var NextElement= document.getElementById(next_rowID).getElementsByClassName("col-lg-6")[0]
            $(NextElement).appendTo('#' + curr_rowID);
            if(($('#row-'+total_rows).children().length == 0)){
                $(element).parent().parent().parent().parent().remove();
                $('#container-'+total_rows).remove();
                total_rows--;
            }
        } 
    }

    total_rows = $("#add-photos").children().length;
    //if the last row has only one child, then is_photo_odd is true
    if($('#row-'+total_rows).children().length == 1){
        is_photo_odd = true;
    } else{
        is_photo_odd = false;
    }
    if(total_rows < 2){
        $(".carousel-control-prev-icon").hide();
        $(".carousel-control-next-icon").hide();
    }

};


function remove_photo_button() {
    $("#modal_body").empty();
    $("#modal_footer").empty();
    $("#modal_body").append(
        "<h2>Media Removed Successfully!!</h2>"
    );
    setTimeout(function() {
        temp_image_object.splice(current, 1);
        temp_image_desc.splice(current,1);
        current--;
        if(temp_image_object.length == 0){
            $("#modal-default").modal('hide');
            current = 0;
            next_click = false;
        } else if(current <= temp_image_object.length-1  && current >= 0){ //when image removed is not first in the list, it displays the previous image in list
            $("#modal_footer").empty();
            img_desc_temp();    
            preview_image(); 
            img_desc_foot(); 
        } else { //when the image removed is first one in the list, it displays the next image in list
            current++;
            $("#modal_footer").empty();
            img_desc_temp();    
            preview_image(); 
            img_desc_foot(); 
        }
    }, 2000);
};

var total_number_of_videos = 1;
var video_object = [];
var video_index = [];
var last_video_index = 0;
$(document).on("change", "#videos", function() {

    var number_of_sub_videos = ($("#video_preview").children().length) /2;

    if(number_of_sub_videos == 0){
        number_of_sub_videos++;

        var sub_video = "sub-videos-"+number_of_sub_videos;
        $("#video_preview").append(
            "<div class=\"row\" id=\""+sub_video+"\">"+
                
            "</div>"+
            "<br>"
        );
    }

    var sub_video_string = "#sub-videos-"+number_of_sub_videos;
    var number_of_videos = $(sub_video_string).children().length;

    if(number_of_videos == 2){
    
        number_of_sub_videos++;

        var sub_video = "sub-videos-"+number_of_sub_videos;
        $("#video_preview").append(
            "<div class=\"row\" id=\""+sub_video+"\">"+
                
            "</div>"+
            "<br>"
        );

        sub_video_string = "#sub-videos-"+number_of_sub_videos;

        $(sub_video_string).append(
            "<div class=\"col-lg-6\" id=\"video-"+total_number_of_videos+"\" style=\"z-index:1;\">"+
                "<div style=\"width: auto;\">"+
                    "<div class=\"card card-stats mb-4 mb-lg-0\">"+
                        "<div class=\"card-body\">"+
                            "<div class=\"row\">"+
                                "<div class=\"col-12 text-center\" >"+
                                    "<button type=\"button\" class=\"close\" onclick = delete_video("+total_number_of_videos+")>"+
                                        "<span aria-hidden=\"true\" style=\"font-size: 125%; color: #f5365c;\">×</span>"+
                                    "</button><br><br>"+
                                    "<video style=\"max-width: 100%; \" controls>"+
                                        "<source id=\"video-preview-"+total_number_of_videos+"\">"+
                                    "</video>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"
        );
    } else {

        $(sub_video_string).append(
            "<div class=\"col-lg-6\" id=\"video-"+total_number_of_videos+"\" style=\"z-index:1;\">"+
                "<div style=\"width: auto;\">"+
                    "<div class=\"card card-stats mb-4 mb-lg-0\">"+
                        "<div class=\"card-body\">"+
                            "<div class=\"row\">"+
                                "<div class=\"col-12 text-center\">"+
                                    "<button type=\"button\" class=\"close\" id=\"remove-vid\" onclick = delete_video("+total_number_of_videos+")>"+
                                        "<span aria-hidden=\"true\" style=\"font-size: 125%; color: #f5365c;\">×</span>"+
                                    "</button><br><br>"+
                                    "<video style=\"max-width: 100%; \" controls>"+
                                        "<source id=\"video-preview-"+total_number_of_videos+"\">"+
                                    "</video>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"
        );
    }

    var video_preview_string = "#video-preview-"+total_number_of_videos;

    var source = $(video_preview_string);
    source[0].src = URL.createObjectURL(this.files[0]);
    source.parent()[0].load();
    video_object[total_number_of_videos-1] = this.files[0];
    video_index[last_video_index] = total_number_of_videos;
    last_video_index++;
    total_number_of_videos++;
});


/* 
    Delete video - DC
*/
function delete_video(video_to_delete) {
    var delete_video_row_id = $("#video-"+video_to_delete).parent().attr('id');
    $("#video-"+video_to_delete).remove();

    var delete_video_rowID_num = delete_video_row_id.replace("sub-videos-",'');
    var total_rows_of_video = ($("#video_preview").children().length)/2;
    var next_row_num = parseInt(delete_video_rowID_num)+1;
    // For shifting all elements by 1 to fill the gap
    for(i = next_row_num; i <= total_rows_of_video; i++){
        var curr= i-1;
        var curr_row_name = "#sub-videos-"+ curr;
        var next_row_name = "#sub-videos-"+ i;
        var first_video_next_row = $(next_row_name).children(":first").attr("id");
         $('#' + first_video_next_row).appendTo(curr_row_name);
    }
    if($('#sub-videos-'+total_rows_of_video).children().length == 0){
        $('#sub-videos-'+total_rows_of_video).next('br').remove();
        $('#sub-videos-'+total_rows_of_video).remove();
        total_rows_of_video--;
    }
    
    //for loop to delete the video from the video_object array(which goes to the storage in firebase)
    for(var i = 0; i < last_video_index; i++){
        if (video_index[i] == video_to_delete){
            video_object.splice(i,1);
            video_index.splice(i,1);
        }
    }
}

// this function will store values of all fields;
$("#create-profile").click(function(){

    document.getElementById("createProfileLoader").style.display = "inline-block";

    var userDescription = $("#personal-description").val();
    var headline = headlineCorrector();
    var numberOfEducation = $("#extra-education").children().length + 1;
    var numberOfWorkExperience = $("#extra-work-experience").children().length + 1;
    var profilePicJson = { profileImg: profilePicture };
    var personalIntro = {
        headline: headline,
        personalDescription: userDescription,
    }
    var mainJson = {
        personalIntro: personalIntro,
        education:{},
        workExperience:{},
        skills:{},
        images:{},
        videos:{}
    };

    for (var i = 1; i <= numberOfEducation; i++){
        var className = ".extra-education-" + i;
        var eduObj = $(className);
        var keyName = "education" + i;
        mainJson.education[keyName] = {};

        mainJson.education[keyName].school = eduObj[0].value;
        mainJson.education[keyName].degreeType = eduObj[1].value;
        mainJson.education[keyName].courseField = eduObj[2].value;
        mainJson.education[keyName].dateOfGraduation = eduObj[3].value;
    }

    for (var i = 1; i <= numberOfWorkExperience; i++){
        var className = ".extra-work-experience-" + i;
        var workExObj = $(className);
        var keyName = "workExperience" + i;
        mainJson.workExperience[keyName] = {};

        mainJson.workExperience[keyName].companyName = workExObj[0].value;
        mainJson.workExperience[keyName].jobTitle = workExObj[1].value;
        mainJson.workExperience[keyName].years = workExObj[2].value;
        mainJson.workExperience[keyName].description = workExObj[3].value;
    }

    for (var i = 1; i <= skill_name_arr.length; i++){
        var keyName = "skill" + i;
        mainJson.skills[keyName] = {};

        mainJson.skills[keyName].skill = skill_name_arr[i-1];
        mainJson.skills[keyName].description = skill_desc_arr[i-1];
    }
    
    var imageURL;
    var videoURL;

    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            var userId = user.uid;

            var promises = [];

            var promise1 = sendAllFilesToStorage(userId, "images");
            promises.push(promise1);
            promise1.then(function(URL) { imageURL = URL; });
            var promise2 = sendAllFilesToStorage(userId, "videos");
            promises.push(promise2);
            promise2.then(function(URL) { videoURL = URL; })

            const all = Promise.all(promises);
            all.then(function() {
                
                for (var i = 1; i <= imageURL.length; i++){
                    var keyName = "image" + i;
                    mainJson.images[keyName] = {};
            
                    mainJson.images[keyName].url = imageURL[i-1];
                    mainJson.images[keyName].description = image_desc[i-1];
                    mainJson.images[keyName].name = image_object[i-1].name;
                }

                for (var i = 1; i <= videoURL.length; i++){
                    var keyName = "video" + i;
                    mainJson.videos[keyName] = {};
            
                    mainJson.videos[keyName].url = videoURL[i-1];
                    mainJson.videos[keyName].name = video_object[i-1].name;
                }

                var promise3 = sendProfileImgToFirebase(profilePicJson);
                promise3.then(function() {
                    var promise4 = sendJsonToFirebase(mainJson);
                    promise4.then(function(){
                        document.getElementById("createProfileLoader").style.display = "none";
                        console.log("Congratulations, we created your profile.");
                    })
                    promise4.catch(function(){
                        document.getElementById("createProfileLoader").style.display = "none";
                        console.log("Sorry, Not able to create profile. Please try again.")
                    });
                });
                promise3.catch(function(){
                    // Do nothing
                });


            });
            
        } else {
            document.getElementById("createProfileLoader").style.display = "none";
            console.log("Sorry, Not able to create profile. Please try again.")
        }
    });

});

function headlineCorrector() {
    var headline = $("#headline").html();
    if(headline == "This is your Introduction Headline. Change it using below text field."){
        headline = "";
    }
    return headline;
}

//This function is responsible to send all the files in file array to firebase storage
function sendAllFilesToStorage(uid, category){
   
    return new Promise(function (resolve, reject) {
    
        //create variables
        var file;

        if(category == "images"){
            file = image_object;
        } else if (category == "videos") {
            file = video_object;
        }
        var numberOfFiles = file.length;
        var URL = [];
        var promises = [];

        //take one file at a time and send to storage
        for(var i=0; i<numberOfFiles; i++){
            
            //call a function to send file and wait till it returns an url
            var promise = sendFileToStorage(i, uid, category, file);
            promises.push(promise);
            promise.then(function(fileUrl) { URL.push(fileUrl); });
            promise.catch(function(fileUrl) { URL.push(fileUrl); });

        }

        const all = Promise.all(promises);
        all.then(function() {
            return resolve(URL)
        });

    });

}

//Send a single file to firebase storage
function sendFileToStorage(index, uid, category, file){

    return new Promise(function (resolve, reject) {

        //collecting promise of file sent
        var filePromise = firebase.storage().ref().child(category).child(uid).child("profilePage").child(file[index].name).put(file[index]);
        filePromise.then(function(snapshot){

            //get the url of the file uploaded
            var getUrl = snapshot.ref.getDownloadURL();
            getUrl.then(function(url) {
                return resolve(url); //return url
            })
            getUrl.catch(function(error){
                //TODO think on it, may be we can delete file and return ""
            })

        })
        filePromise.catch(function(error){
            return reject(""); //return an empty array if file is not uploaded
        })
    });
}


//This function tries to send json to firebase 2 times if 1st fails and 
//if it successfully sends json returns true or remove all files from storage and retrun false
function sendJsonToFirebase(profileJson) {

    return new Promise(function (resolve, reject) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

                var userId = user.uid;

                //tries to send json 1st time
                var profileInfoPromise = firebase.database().ref().child("data").child("employee").child("profile").child(userId).set(profileJson);
                profileInfoPromise.then(function() {
                    return resolve(); //if 1st try successful
                });
                profileInfoPromise.catch(function(error) {
                    // delete the profile picture which was sent to firebase before this 
                    var promiseRemoveProfileImg1 = removeProfileImg(userID);
                    promiseRemoveProfileImg1.then(function(){
                        return reject();
                    });
                    promiseRemoveProfileImg1.catch(function() {
                        return reject();
                    });
                    //delete all files from stroge and return reject
                    var promise1 = removeAllFilesFromStorage(userId, profileJson); //this is asyncronous call, so we will wait till all files are deleted
                    promise1.then(function(){
                        return reject();
                    });
                    promise1.catch(function(){
                        return reject();
                    })
                });
            } else {
                // delete the profile picture which was sent to firebase before this 
                var promiseRemoveProfileImg2 = removeProfileImg(userID);
                promiseRemoveProfileImg2.then(function() {
                    return reject();
                });
                promiseRemoveProfileImg2.catch(function() {
                    return reject();
                });
                //delete all files from stroge and return reject
                var promise2 = removeAllFilesFromStorage(userId, profileJson); //this is asyncronous call, so we will wait till all files are deleted
                promise2.then(function(){
                    return reject();
                });
                promise2.catch(function(){
                    return reject();
                })
            }
        });
    });

}

/*
    Sending Profile Picture to Database - Utkarsh
*/
// Send the profile picture to Firebase Database 
// If it fails to send the profile picture then 
function sendProfileImgToFirebase(profileImageData){

    if(!profileImageData.profileImg){ return }
    return new Promise(function(resolve, reject) {
        firebase.auth().onAuthStateChanged(function(user){
            // If a user is logged in 
            if(user) {
                // Get the uid
                var userID = user.uid;
                // send the image data to firebase
                var profileImagePromise = firebase.database().ref().child("data").child("employee").child("userInfo").child(userID).child("profileImgData").set(profileImageData.profileImg);

                profileImagePromise.then(function() {
                    return resolve();
                })
                profileImagePromise.catch(function(error) {
                    return reject();                    
                });

            }
        });
    });
}

/*
    Removing Profile Picture from Database - Utkarsh
*/
function removeProfileImg(userID){

    return new Promise(function(resolve, reject) {
        var filePath = 'data/employee/userInfo/'+userID+'/profileImgData';
        var databaseRef = firebase.database().ref(filePath);
        var databaseRefPromise = databaseRef.remove();
        databaseRefPromise.then(function() {
            return resolve();
        });
        databaseRef.catch(function(error) {
            return resolve();
        });
    });
}

// This funciton deletes all profile files of a specified user id
function removeAllFilesFromStorage(userId, profileJson){
   
    return new Promise(function (resolve, reject) {

        var promises = [];

        var numberOfMedia = Object.keys(profileJson.profileMedia).length;
        for(i=1; i<numberOfMedia; i++){
            var mediaName = "media" + i; //this is a statement which grabs media name as we will have multiple media
            var fileName = profileJson.profileMedia[mediaName].storageName; //once we have media name, we can now grab file name in storage
            var filePath = 'photo/'+userId+'/profile_images/'+fileName; //now we have file name in stroage, so we can give the path to that file in storage
            var promise1 = removeFileFromStorage(filePath); //this is asyncronous call, so we will wait till required file is deleted
            promises.push(promise1);
        }


        const all = Promise.all(promises);
        all.then(function() {
            return resolve();
        });

    });
}

//This function will delete file from the path provided
function removeFileFromStorage(filePath) {

    return new Promise(function (resolve, reject) {

        var storageRef = firebase.storage().ref(filePath); //create reference to file
        var storageRefRemovePromise = storageRef.delete(); //delete
        storageRefRemovePromise.then(function() {
            return resolve(); //wait till we get result
        });
        storageRefRemovePromise.catch(function(error){
            //wait till we get result, if we are not able to delete file we will move ahead as file size will be comparitively small and
            //we don't want to waste time on it and also the failure rate is very less as firebase is scalable.
            return resolve();  
        });
    
    });

}


