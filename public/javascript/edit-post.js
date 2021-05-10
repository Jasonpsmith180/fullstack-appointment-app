async function editFormHandler(event) {
  event.preventDefault();

  const title = document
    .querySelector('input[name="appointment-title"]')
    .value.trim();
  const content = document
    .querySelector('textarea[name="appointment-text"]')
    .value.trim();
  const date_time = document
    .querySelector('input[name="appointment-date"]')
    .value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
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
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
