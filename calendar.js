Date.prototype.months = function* ()
{
    const now = new Date(this)
    const year = now.getFullYear()
    now.setMonth(0, 1)
    while (now.getFullYear() === year)
    {
        yield now;
        now.setMonth(now.getMonth()+1);
    }
}

Date.prototype.days = function* ()
{
    const now = new Date(this)
    const month = now.getMonth()
    now.setDate(1)
    while (now.getMonth() === month)
    {
        yield now;
        now.setDate(now.getDate()+1);
    }
}

const fmtYear = new Intl.DateTimeFormat("en-NZ", {year: "numeric"})
const fmtMonth = new Intl.DateTimeFormat("en-NZ", {month: "long"})
const fmtDay = new Intl.DateTimeFormat("en-NZ", {day: "numeric"})
const fmtWeekDay = new Intl.DateTimeFormat("en-NZ", {weekday: "short"})

const now = new Date

const yearElement = document.createElement("year")
yearElement.setAttribute("year", fmtYear.format(now))
document.body.append(yearElement)
for (var m of now.months())
{
    const monthElement = document.createElement("month")
    monthElement.setAttribute("month", fmtMonth.format(m))
    yearElement.append(monthElement)

    for (var d of m.days())
    {
        const dayElement = document.createElement("day");
        dayElement.setAttribute("day", fmtDay.format(d))
        dayElement.setAttribute("day-of-week", fmtWeekDay.format(d))
        monthElement.append(dayElement)
    }
}
