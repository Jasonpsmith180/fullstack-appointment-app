async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="appointment-title"]').value;
  const content = document.querySelector('textarea[name="appointment-text"]')
    .value;
  const date_time = document.querySelector('input[name="appointment-date"]')
    .value;

  console.log(title, content, date_time);

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      date_time,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
