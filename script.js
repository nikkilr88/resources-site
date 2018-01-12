$(function() {
    //Sort data alphabetically
    data = data.sort((a, b) => a.name.localeCompare(b.name));

    //Get all sections and create div
    const sections = $('.courses, .ide');
    const sectionsArray = Array.from(sections);

    // LOAD DATA INTO SECTIONS
    sectionsArray.forEach(section => {
        let category = section.dataset.category;
        loadCourses(data, category)
    });

    $('body').on('click', '.tag', displayMatch);
});

/* =================

    HELPER FUNCTIONS

================= */

function loadCourses(data, div) {
    let courses = data.filter(item => item.category === div);
    let courseDivs = courses.map(createDiv);

    $(`.${div}`).html(courseDivs)
}

function createTag(item) {
    let tags = item.tags.map(tag => {
        let tagSpan = `<span class="tag">${tag}</span>`;
        return tagSpan;
    }).join('');

    return tags;
}

function createDiv(item) {
    let tags = createTag(item);
    let imgSrc = item.img || './img/screenshots/default.png';
    let div = `
        <div class="box">
            <img src="${imgSrc}">
            <h4>${item.name}</h4>
            <a href="${item.url}" target="_blank"><button>Visit Site</button></a>
            ${tags}
        </div>
    `;

    return div;
}

function displayMatch(e) {
    let $this = $(e.currentTarget);
    let tag = $this.text() === 'JavaScript' ? 'js' : $this.text().toLowerCase();
    let count = 0;

    $('#result .results').empty();
    

    data.forEach(item => {
        if (item.tags.includes(tag)) {
            let div = createDiv(item);
            $('#result .results').append(div)
            count++;
        }
    });

    let title = `${count} resource(s) that match '${tag}'`;
    $('#result .title').text(title);
}