function setCookie(key, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${key}=${value || ""}${expires}; path=/`;
}

function getCookie(key) {
  const nameEQ = key + "=";
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(nameEQ))
    .split("=")[1];
}

function deleteCookie(key) {
  setCookie(key, "", -1);
}

function handleForm(event) {
  event.preventDefault();
}

function countMinNumbers(numbers) {
  let minNumber = numbers[0];
  let minCount = 1;
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < minNumber) {
      minNumber = numbers[i];
      minCount = 1;
    } else if (numbers[i] === minNumber) {
      minCount++;
    }
  }
  return minCount;
}

window.onload = function () {
  const savedCount = getCookie("minCount");

  if (savedCount) {
    const useSaved = confirm(
      `Збережені дані в cookies: ${savedCount}. Бажаєте їх використати?`
    );
    if (useSaved) {
      document.getElementById("min-form").classList.add("hidden");

      alert(
        `Дані взято з cookies: ${savedCount}. Після цього сторінку потрібно перезавантажити.`
      );
    } else {
      deleteCookie("minCount");
      location.reload();
    }
  } else {
  }
};

function handleForm(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll("#min-form input[type='number']");
  const numbers = Array.from(inputs).map((input) => Number(input.value));
  const minCount = countMinNumbers(numbers);
  alert(`Кількість мінімальних чисел: ${minCount}`);
  setCookie("minCount", minCount, 7);
  location.reload();
}
