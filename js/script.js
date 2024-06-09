document.addEventListener("DOMContentLoaded", function () {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    fetch('data/data.yml')
        .then(response => response.text())
        .then(yamlText => {
            const data = jsyaml.load(yamlText);
            populateData(data);
        })
        .catch(error => console.error('Error fetching YAML:', error));

    const today_date = new Date();

    function date_to_string(date) {
        return ((date.getTime() === today_date.getTime()) ? 'Present' : monthNames[(date.getMonth())] + ' ' + date.getFullYear().toString());
    }

    function populateData(data) {
        // Heading
        let heading = `
          <div id="my_name">${data.name}</div>
          <div class="info-item">
              <span class="info-label"><i class="fa fa-location-arrow"></i></span>
              <span class="info-text">${data.location}</span>
          </div>
          <div class="info-item">
              <span class="info-label"><i class="fab fa-linkedin"></i></span>
              <span class="info-text"><a href="${data.linkedin.url}" target="_blank">${data.linkedin.text}</a></span>
          </div>
          <div class="info-item">
              ${data.website.map(website => `
                  <span class="info-label"><i class="fa fa-globe"></i></span>
                  <span class="info-text"><a href="${website.url}" target="_blank">${website.text}</a></span>
              `).join(' ')}
          </div>
          <div id="contact-info" class="info-item" hidden>
              <span class="info-label"><i class="fa fa-envelope"></i></span>
              <span id="info-email" class="editible-input info-text">@gmail.com</span>
              <span class="info-label"><i class="fa fa-phone"></i></span>
              <span id="info-phone" class="editible-input info-text">+977-98</span>
          </div>`;
        document.getElementById('heading').innerHTML = heading;

        // About Me
        document.getElementById('about-me').innerText = data.about;

        // Work Experiences
        let workExperiencesHTML = '';
        data['work-experiences'].forEach(work => {
            let experiencesHTML = '';
            work.experiences.forEach(experience => {
                let responsibilitiesHTML = experience.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('');
                experiencesHTML += `
                  <h2>${work.entity} - ${work.location}</h2>
                  <div class="heading3"><strong>${experience.title_name}</strong></div>
                  <div class="highlight">${date_to_string(new Date(experience.start)).toUpperCase()} – ${date_to_string(new Date(experience.end || today_date)).toUpperCase()}</div>
                  <ul>${responsibilitiesHTML}</ul>`;
                if (experience.skills && experience.skills.length > 0) {
                    experiencesHTML += `<div class="highlight">${experience.skills.join(" · ").toUpperCase()}</div>`;
                }
            });
            workExperiencesHTML += `<div class="items">${experiencesHTML}</div>`;
        });
        document.getElementById('work_experiences').innerHTML = workExperiencesHTML;

        // Academic Qualifications
        let academicQualificationsHTML = '';
        data['academic-qualifications'].forEach(qualification => {
            let educationsHTML = '';
            qualification.educations.forEach(education => {
                let studiesHTML = education.studies.map(study => `
                  <div class="heading3"><strong>${study.study_name}</strong></div>
                  <div class="highlight">${date_to_string(new Date(study.start)).toUpperCase()} – ${date_to_string(new Date(study.end || today_date)).toUpperCase()}</div>
              `).join('');
                educationsHTML += studiesHTML;
            });
            academicQualificationsHTML += `<div class="items"><h2>${qualification.entity} - ${qualification.location}</h2>${educationsHTML}</div>`;
        });
        document.getElementById('academic_qualifications').innerHTML = academicQualificationsHTML;

        // Skills
        let skillsHTML = Object.entries(data.skills).map(([skillName, skillObject]) => `
          <p>
              <span class="heading3">${skillName}</span> - 
              <span class="highlight">${skillObject.sub_skills.join(" · ").toUpperCase()}</span>
          </p>`).join('');
        document.getElementById('skills').innerHTML = skillsHTML;
    }
});

function ExportToDoc(elementId, filename = '') {
    var element = document.getElementById(elementId);
    var clonedElement = element.cloneNode(true);

    // Function to convert computed styles to inline styles
    function applyInlineStyles(element) {
        var nodes = element.getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var computedStyle = window.getComputedStyle(node);
            var style = '';

            for (var j = 0; j < computedStyle.length; j++) {
                var key = computedStyle[j];
                var value = computedStyle.getPropertyValue(key);
                style += key + ':' + value + ';';
            }

            node.setAttribute('style', style);
        }
    }

    applyInlineStyles(clonedElement);

    var header = "<html \
    xmlns:v='urn:schemas-microsoft-com:vml' \
    xmlns:o='urn:schemas-microsoft-com:office:office' \
    xmlns:w='urn:schemas-microsoft-com:office:word' \
    xmlns:m='http://schemas.microsoft.com/office/2004/12/omml' \
    xmlns='http://www.w3.org/TR/REC-html40'>\
    <head>\
    <meta http-equiv=Content-Type content='text/html; charset=utf-8'>\
    <title></title>\
    <style>\
    /* Add any additional styles here if necessary */\
    </style>\
    <xml>\
    <w:WordDocument>\
    <w:View>Print</w:View>\
    <w:Zoom>100</w:Zoom>\
    <w:DoNotOptimizeForBrowser/>\
    </w:WordDocument>\
    </xml>\
    </head>\
    <body>";

    var footer = "</body></html>";

    var sourceHTML = header + clonedElement.innerHTML + footer;
    var blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword'
    });

    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename ? filename + '.doc' : 'document.doc';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
