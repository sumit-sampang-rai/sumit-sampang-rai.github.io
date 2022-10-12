const today_date = new Date();

function date_to_string(date) {
  return ((date.getTime() === today_date.getTime()) ? 'Present' : ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear().toString());
}

function calc_months(start, end) {
  var months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();
  return months;
}

function months_readable(months, plus = false) {
  var exp_years = Math.floor(months / 12);
  var exp_months = months % 12;
  return ((exp_years == 0) ? '' : exp_years + ((exp_years == 1) ? ' year ' : ' years')) +
    (
      plus ? '+' : (exp_months == 0) ? '' : ((exp_years == 0) ? '' : ' ') +
        exp_months + ((exp_months == 1) ? ' month' : ' months')
    );
}

$.getJSON("data/data.json").done(function (data) {
  var heading = '';
  var work_experiences = '';
  var academic_qualifications = '';
//   var recognitions = '';
  var skills = '';

  // heading
  // title
  heading += '<div id="my_name">' + data["name"] + '</div>'

  // location
  heading += '<div class="info-item">'
  heading += '<span class="info-label"><i class="fa fa-location-arrow"></i></span>'
  heading += '<span class="info-text">' + data["location"] + '</span>'
  heading += '</div>'

  heading += '<div class="info-item">'
  heading += '<span class="info-label"><i class="fab fa-linkedin"></i></span>'
  heading += '<span class="info-text"><a href="' + data["linkedin"]["url"] + '" target="_blank">' + data["linkedin"]["text"] + '</a></span>'
  heading += '</div>'
  heading += '<div class="info-item">'
  heading += '<span class="info-label"><i class="fa fa-globe"></i></span>'
  $.each(data["website"], function (website_index, website_object) {
    heading += '<span class="info-text"><a href="' + website_object["url"] + '" target="_blank">' + website_object["text"] + '</a></span>'
  });
  heading += '</div>'

  heading += '<div id="contact-info" class="info-item" hidden>'
  heading += '<span class="info-label"><i class="fa fa-envelope"></i></span>'
  heading += '<span id="info-email" class="editible-input info-text">@gmail.com</span>'
  heading += '<span class="info-label"><i class="fa fa-phone"></i></span>'
  heading += '<span id="info-phone" class="editible-input info-text">+977-98</span>'
  heading += '</div>'

  $.each(data["work-experiences"], function (work_experience_index, work_experience_object) {
    var experiences = '';

    $.each(work_experience_object["experiences"], function (experience_index, experience_object) {
      var responsibilities = '';

      var end_date = today_date;
      var start_date = new Date(experience_object["start"]);
      end_date = (experience_object["end"] === null ? end_date : new Date(experience_object["end"]));
      // var months_count = calc_months(start_date, end_date) + 1;

      $.each(experience_object["responsibilities"], function (responsibility_index, responsibility_desc) {
        responsibilities += '<li>' + responsibility_desc + '</li>'
      });
      experiences += '<h2>' + work_experience_object["entity"]  + ' - ' + work_experience_object["location"] + '</h2>' // + ' (' + months_readable(company_experience_months) + ')'
      experiences += '<div>'
      experiences += '<span class="heading3"><strong>' + experience_object["title_name"] + '</strong></span>'
      experiences += ' - '
      experiences += '<span class="highlight">'
      experiences += date_to_string(start_date).toUpperCase() + ' – ' + date_to_string(end_date).toUpperCase()
      experiences += '</span>'
      experiences += '</div>'
      experiences += '<div id=exp-' + work_experience_index + experience_index + ' class="editible-textarea details">'
      experiences += '<ul>' + responsibilities + '</ul>'
      experiences += '</div>'
    });
    work_experiences += '<div class="items">'
    work_experiences += experiences
    work_experiences += '</div>'
  });

  $.each(data["academic-qualifications"], function (academic_qualification_index, academic_qualification_object) {
    var educations = '';
    var institution_education_months = 0;
    $.each(academic_qualification_object["educations"], function (education_index, education_object) {
      var studies = '';
      $.each(education_object["studies"], function (study_index, study_object) {
        var end_date = today_date;
        var start_date = new Date(study_object["start"]);
        end_date = (study_object["end"] === null ? end_date : new Date(study_object["end"]));
        var months_count = calc_months(start_date, end_date);

        institution_education_months += months_count;

        studies += '<div>'
        studies += '<span class="heading3"><strong>' + study_object["study_name"] + '</strong></span>'
        studies += ' - '
        studies += '<span class="highlight">'
        studies += date_to_string(start_date).toUpperCase() + ' – ' + date_to_string(end_date).toUpperCase()
        // studies += ' (' + months_readable(months_count) + ')'
        studies += '</span>'
        studies += '</div>'
      });
      // $.each(education_object["responsibilities"], function (responsibility_index, responsibility_desc) {
      //   responsibilities += '<li>' + responsibility_desc + '</li>'
      // });
      educations += studies
    });
    academic_qualifications += '<div class="items">'
    academic_qualifications += '<h2>' + academic_qualification_object["entity"] + ' - ' + academic_qualification_object["location"] + '</h2>'
    academic_qualifications += educations
    academic_qualifications += '</div>'
  });

//   $.each(data["recognitions"], function (recognition_index, recognition_object) {
//     $.each(recognition_object["awards"], function (award_index, award_object) {
//       var start_date = new Date(award_object["start"]);
//       var start_date_string = months[start_date.getMonth()] + ' ' + start_date.getFullYear().toString();

//       recognitions += '<div class="items">'
//       recognitions += '<h3><strong>' + award_object["award_name"] + '</strong> — ' + recognition_object["entity"] + '</h3>'
//       recognitions += '<div class="highlight">'
//       recognitions += start_date_string.toUpperCase()
//       recognitions += '</div>'
//       recognitions += '<div class="details">'
//       recognitions += award_object["description"]
//       recognitions += '</div>'
//       recognitions += '</div>'
//     });
//   });

  $.each(data["skills"], function (skill_name, skill_object) {
    skills += '<div>'
    skills += '<span class="heading3">' + skill_name + '</span class="heading3">'
    skills += ' - '
    skills += '<span class="highlight">'
    skills += skill_object["sub_skills"].join(" · ").toUpperCase()
    skills += '</span>'
    skills += '</div>'
    // skills += '<div class="extra-details">'
    // skills += '<div class="extra-details__progress" style="width: ' + skill_object["confidence"] + '%">'
    // skills += '</div>'
    // skills += '</div>'
  });

  $("title").append(data["page"]);
  $("#heading").append(heading);
  $("#about-me").append(data["about"]);
  $("#work_experiences").append(work_experiences);
  $("#academic_qualifications").append(academic_qualifications);
  $("#skills").append(skills);
//   $("#recognitions").append(recognitions);
});

$(document).on("dblclick", ".editible-input", function(){
  var identifier = $(this);
  var new_identifier_id = 'new-' + this.id;
  var current = $(this).text();
  $(this).html('<input id="' + new_identifier_id + '" value="' + current + '"></input>');
  new_identifier = $('#' + new_identifier_id)
  new_identifier.focus();

  new_identifier.focus().blur(function() {
    var newcont = $(new_identifier).val();
    console.log(identifier);
    $(identifier).text(newcont);
  });
});

$(document).on("dblclick", ".editible-textarea", function(){
  var identifier = $(this);
  var new_identifier_id = 'new-' + this.id;
  var current = $(this).html();
  $(this).html('<textarea id="' + new_identifier_id + '" rows="10" cols="100">' + current + '</textarea>');
  new_identifier = $('#' + new_identifier_id)
  new_identifier.focus();

  new_identifier.focus().blur(function() {
    var newcont = $(new_identifier).val();
    console.log(newcont);
    $(identifier).html(newcont);
  });
});
