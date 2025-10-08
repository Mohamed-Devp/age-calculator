const dayInputEl = document.getElementById('day');
const monthInputEl = document.getElementById('month');
const yearInputEl = document.getElementById('year');

const calculateBtn = document.querySelector('.calculate button');

const daysOutputEl = document.querySelector('.days span');
const monthsOutputEl = document.querySelector('.months span');
const yearsOutputEl = document.querySelector('.years span');

function calculateAge(birthDay, birthMonth, birthYear) {
    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
    }

    if (ageDays < 0) {
        ageMonths -= 1;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += prevMonth.getDate();
    }

    return { years: ageYears, months: ageMonths, days: ageDays }
}

function handleCalculateClick() {
    const birthDay = Number(dayInputEl.value);
    const birthMonth = Number(monthInputEl.value);
    const birthYear = Number(yearInputEl.value);

    const age = calculateAge(birthDay, birthMonth, birthYear);

    daysOutputEl.textContent = age.days;
    monthsOutputEl.textContent = age.months;
    yearsOutputEl.textContent = age.years;
}

calculateBtn.addEventListener('click', handleCalculateClick);