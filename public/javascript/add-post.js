async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="appointment-title"]').value;
    const content = document.querySelector('textarea[name="appointment-text"]').value;
    const date_time = document.querySelector('textarea[name="appointment-date"]').value;

    const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
        title,
        content,
        date_time
    }),
    headers: {
        'Content-Type': 'application/json'
    }
    });

    if (response.ok) {
    document.location.replace('/appointment');
    } else {
    alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);