const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$.getJSON("data/data.json").done(function (data) {
  var work_experiences = '';
  var academic_qualifications = '';
  var skills = '';

  $.each(data["work-experiences"], function (work_experience_index, work_experience_object) {
    var experiences = '';
    $.each(work_experience_object["experiences"], function (experience_index, experience_object) {
      var responsibilities = '';
      var titles = '';
      $.each(experience_object["titles"], function (title_index, title_object) {
        var today_date = new Date()
        var end_date = new Date();
        var start_date = new Date(title_object["start"]);
        end_date = (title_object["end"] === null ? end_date : new Date(title_object["end"]));

        var start_date_string = months[start_date.getMonth()] + ' ' + start_date.getFullYear().toString();
        var end_date_string = ((end_date.getTime() === today_date.getTime()) ? 'Present' : months[end_date.getMonth()] + ' ' + end_date.getFullYear().toString());

        titles += '<h3><strong>' + title_object["title_name"] + '</strong> — ' + title_object["location"]  + '</h3>'
        titles += '<div class="highlight">' + start_date_string.toUpperCase() + ' – ' + end_date_string.toUpperCase() + '</div>'
      });
      $.each(experience_object["responsibilities"], function (responsibility_index, responsibility_desc) {
        responsibilities += '<li>' + responsibility_desc + '</li>'
      });
      experiences += titles
      experiences += '<div class="details">'
      experiences += '<ul>' + responsibilities + '</ul>'
      experiences += '</div>'
    });
    work_experiences += '<div class="items">'
    work_experiences += '<h2>' + work_experience_object["company"] + '</h2>'
    work_experiences += experiences
    work_experiences += '</div>'
  });

  $.each(data["academic-qualifications"], function (academic_qualification_index, academic_qualification_object) {
    var educations = '';
    $.each(academic_qualification_object["educations"], function (education_index, education_object) {
      var studies = '';
      $.each(education_object["studies"], function (study_index, study_object) {
        var today_date = new Date()
        var end_date = new Date();
        var start_date = new Date(study_object["start"]);
        end_date = (study_object["end"] === null ? end_date : new Date(study_object["end"]));

        var start_date_string = months[start_date.getMonth()] + ' ' + start_date.getFullYear().toString();
        var end_date_string = ((end_date.getTime() === today_date.getTime()) ? 'Present' : months[end_date.getMonth()] + ' ' + end_date.getFullYear().toString());

        studies += '<h3><strong>' + study_object["study_name"] + '</strong> — ' + study_object["location"]  + '</h3>'
        studies += '<div class="highlight">' + start_date_string.toUpperCase() + ' – ' + end_date_string.toUpperCase() + '</div>'
      });
      $.each(education_object["responsibilities"], function (responsibility_index, responsibility_desc) {
        responsibilities += '<li>' + responsibility_desc + '</li>'
      });
      educations += studies
    });
    academic_qualifications += '<div class="items">'
    academic_qualifications += '<h2>' + academic_qualification_object["institution"] + '</h2>'
    academic_qualifications += educations
    academic_qualifications += '</div>'
  });

  $.each(data["skills"], function (skill_name, skill_object) {
    skills += '<h3>' + skill_name + '</h3>'
    skills += '<div class="highlight">'
    skills += skill_object["sub_skills"].join(" · ").toUpperCase()
    skills += '</div>'
    // skills += '<div class="extra-details">'
    // skills += '<div class="extra-details__progress" style="width: ' + skill_object["confidence"] + '%">'
    // skills += '</div>'
    // skills += '</div>'
  });

  $("title").append(data["page"]);
  $("#my_name").append(data["name"]);
  $("#about-me").append(data["about"]);
  $("#work_experiences").append(work_experiences);
  $("#academic_qualifications").append(academic_qualifications);
  $("#skills").append(skills);
});
