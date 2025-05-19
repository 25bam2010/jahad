const date = new Date();
const modal = document.getElementById("modal");
const modalDate = document.getElementById("modalDate");
const eventText = document.getElementById("eventText");
const colorInput = document.getElementById("colorInput");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");
const themeColor = document.getElementById("themeColor");
const calendarContainer = document.getElementById("calendarContainer");
const yearSelect = document.getElementById("yearSelect");
const monthSelect = document.getElementById("monthSelect");

let selectedDate = null;

const holidays = {
  "1-1": "신정",
  "3-1": "삼일절",
  "5-5": "어린이날",
  "6-6": "현충일",
  "8-15": "광복절",
  "10-3": "개천절",
  "10-9": "한글날",
  "12-25": "크리스마스"
};

function pad(n) {
  return n.toString().padStart(2, "0");
}

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay();
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  // 연도/월 셀렉트 값 설정
  yearSelect.value = year;
  monthSelect.value = month;

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day";
    calendar.appendChild(empty);
  }

  for (let d = 1; d <= lastDate; d++) {
    const day = document.createElement("div");
    day.className = "day";
    const fullDate = `${year}-${pad(month + 1)}-${pad(d)}`;
    const dayOfWeek = new Date(year, month, d).getDay();

    const number = document.createElement("div");
    number.className = "date-number";
    number.textContent = d;

    if (dayOfWeek === 0) {
      number.style.color = "red";
    }

    const holidayKey = `${month + 1}-${d}`;
    const holidayName = holidays[holidayKey];
    if (holidayName) {
      number.style.color = "red";
      const label = document.createElement("div");
      label.style.color = "red";
      label.style.fontSize = "12px";
      label.textContent = holidayName;
      day.appendChild(label);
    }

    const savedData = localStorage.getItem(fullDate);
    let saved = null;
    if (savedData) {
      try {
        saved = JSON.parse(savedData);
      } catch (e) {
        console.error(`JSON 파싱 오류: ${fullDate}`, savedData);
      }
    }

    if (saved) {
      const span = document.createElement("span");
      span.textContent = saved.text;
      span.style.color = saved.color || "black";
      span.style.fontSize = "12px";
      day.appendChild(span);
    }

    day.appendChild(number);
    day.addEventListener("click", () => {
      selectedDate = fullDate;
      modalDate.textContent = selectedDate;
      eventText.value = saved?.text || "";
      colorInput.value = saved?.color || "#000000";
      modal.style.display = "flex";
    });

    calendar.appendChild(day);
  }
}

function moveMonth(diff) {
  date.setMonth(date.getMonth() + diff);
  renderCalendar();
}

// 드롭다운으로 직접 이동
yearSelect.addEventListener("change", () => {
  date.setFullYear(Number(yearSelect.value));
  renderCalendar();
});
monthSelect.addEventListener("change", () => {
  date.setMonth(Number(monthSelect.value));
  renderCalendar();
});

// 배경 색상 변경
themeColor.addEventListener("input", () => {
  calendarContainer.style.backgroundColor = themeColor.value;
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

saveBtn.addEventListener("click", () => {
  const text = eventText.value.trim();
  const color = colorInput.value;
  if (selectedDate) {
    localStorage.setItem(selectedDate, JSON.stringify({ text, color }));
  }
  modal.style.display = "none";
  renderCalendar();
});

// 초기 연/월 select 채우기
function populateSelects() {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
  for (let m = 0; m < 12; m++) {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = m + 1;
    monthSelect.appendChild(option);
  }
}

populateSelects();
renderCalendar();

// 일정 저장
saveBtn.addEvent
renderCalendar();
