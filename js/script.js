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

        titles += '<small>'
        titles += title_object["title_name"]
        titles += '<span>'
        titles += ' — ' + title_object["location"]
        titles += '</span>'
        titles += '</small>'
        titles += '<div class="xp-date">' + start_date_string + ' – ' + end_date_string + '</div>'
      });
      $.each(experience_object["responsibilities"], function (responsibility_index, responsibility_desc) {
        responsibilities += '<li>' + responsibility_desc + '</li>'
      });
      experiences += '<div class="xp-job">'
      experiences += titles
      experiences += '</div>'
      experiences += '<div class="xp-detail">'
      experiences += '<ul>'
      experiences += responsibilities
      experiences += '</ul>'
      experiences += '</div>'
    });
    work_experiences += '<div class="xp-item">'
    work_experiences += '<div class="xp-company">'
    work_experiences += work_experience_object["company"]
    work_experiences += '</div>'
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

        studies += '<small>'
        studies += study_object["study_name"]
        studies += '<span>'
        studies += ' — ' + study_object["location"]
        studies += '</span>'
        studies += '</small>'
        studies += '<div class="xp-date">' + start_date_string + ' – ' + end_date_string + '</div>'
      });
      $.each(education_object["responsibilities"], function (responsibility_index, responsibility_desc) {
        responsibilities += '<li>' + responsibility_desc + '</li>'
      });
      educations += '<div class="xp-job">'
      educations += studies
      educations += '</div>'
    });
    academic_qualifications += '<div class="xp-item">'
    academic_qualifications += '<div class="xp-institution">'
    academic_qualifications += academic_qualification_object["institution"]
    academic_qualifications += '</div>'
    academic_qualifications += educations
    academic_qualifications += '</div>'
  });

  $.each(data["skills"], function (skill_name, skill_object) {
    skills += '<div class="extra">'
    skills += '<div class="extra-info">'
    skills += skill_name
    skills += '<br />'
    skills += "<small>"
    skills += skill_object["sub_skills"].join(" · ")
    skills += '</small>'
    skills += '</div>'
    // skills += '<div class="extra-details">'
    // skills += '<div class="extra-details__progress" style="width: ' + skill_object["confidence"] + '%">'
    // skills += '</div>'
    // skills += '</div>'
    skills += '</div>'
  });

  $("title").append(data["page"]);
  $("#my_name").append(data["name"]);
  $("#about-me p").append(data["about"]);
  $("#work_experiences").append(work_experiences);
  $("#academic_qualifications").append(academic_qualifications);
  $("#skills").append(skills);
});
