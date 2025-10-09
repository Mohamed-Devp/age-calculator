const dayInputEl = document.getElementById('day');
const monthInputEl = document.getElementById('month');
const yearInputEl = document.getElementById('year');

const calculateBtn = document.querySelector('.calculate button');

const daysOutputEl = document.querySelector('.days span');
const monthsOutputEl = document.querySelector('.months span');
const yearsOutputEl = document.querySelector('.years span');

const errorMessage = {
    day: 'Must be a valid day',
    month: 'Must be a valid month',
    year: 'Must be in the past'
}

function calculateAge(today, birthDate) {
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

function getInputElValue(inputEl, lo, hi) {
    inputEl.classList.add('invalid');

    const errorMsgOutputEl = inputEl.nextSibling.nodeType === Node.TEXT_NODE
        ? inputEl.nextSibling.nextSibling
        : inputEl.nextSibling;

    const inputValStr = inputEl.value;
    const inputValNum = Number(inputValStr);

    // Missing value
    if (!inputValStr.length) {
        errorMsgOutputEl.textContent = 'This field is required';
        return -1;
    }

    // Invalid value
    if (!Number.isInteger(inputValNum) || inputValNum < lo || inputValNum > hi) {
        errorMsgOutputEl.textContent = errorMessage[inputEl.id];
        return -1;
    }

    errorMsgOutputEl.textContent = '';
    inputEl.classList.remove('invalid');
    return inputValNum;
}

function handleCalculateClick() {
    const today = new Date();

    const birthDay = getInputElValue(dayInputEl, 1, 31);
    const birthMonth = getInputElValue(monthInputEl, 1, 12);
    const birthYear = getInputElValue(yearInputEl, 0, today.getFullYear());

    if (birthDay !== -1 && birthMonth !== -1 && birthYear !== -1) {
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

        const errorMsgOutputEl = dayInputEl.nextSibling.nodeType === Node.TEXT_NODE
            ? dayInputEl.nextSibling.nextSibling
            : dayInputEl.nextSibling;

        if (birthDate.getDate() === birthDay) {
            errorMsgOutputEl.textContent = '';

            dayInputEl.classList.remove('invalid');
            monthInputEl.classList.remove('invalid');
            yearInputEl.classList.remove('invalid');

            const age = calculateAge(today, birthDate);

            daysOutputEl.textContent = age.days;
            monthsOutputEl.textContent = age.months;
            yearsOutputEl.textContent = age.years;

        } else {
            errorMsgOutputEl.textContent = 'Must be a valid date';

            dayInputEl.classList.add('invalid');
            monthInputEl.classList.add('invalid');
            yearInputEl.classList.add('invalid');
        }
    }
}

calculateBtn.addEventListener('click', handleCalculateClick);