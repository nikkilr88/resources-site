$(function() {
    const sections = $('.courses, .ide');
    const sectionsArray = Array.from(sections);

    // LOAD DATA
    sectionsArray.forEach(section => {
        let category = section.dataset.category;
        loadCourses(data, category)
    });

    $('main').on('click', '.tag', displayMatch);
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

    let div = `
        <div class="box">
            <h4>${item.name}</h4>
            <a href="${item.url}" target="_blank"><button>Visit Site</button></a>
            ${tags}
        </div>
    `;

    return div;
}

function displayMatch(e) {
    let $this = $(e.currentTarget);

    let tag = $this.text();
    let title = `Resources that match '${tag}'`;

    console.log(tag)

    $('#result .results').empty();
    $('#result .title').text(title)

    data.forEach(item => {
        if (item.tags.includes(tag)) {
            let div = createDiv(item);
            $('#result .results').append(div)
        }
    });
}