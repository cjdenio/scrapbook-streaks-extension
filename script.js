let personsName = document.getElementsByClassName("header-title-name")[0]
  .innerText;

const opts = {
  maxRecords: 1,
  filterByFormula: `{Username} = "${personsName.toLowerCase()}"`,
};
fetch(
  `https://api2.hackclub.com/v0.1/Summer%20of%20Making%20Streaks/Slack%20Accounts?select=${JSON.stringify(
    opts
  )}`
)
  .then((resp) => resp.json())
  .then((data) => {
    setStreakCount(data[0].fields["Streak Count"]);
  });

function setStreakCount(count) {
  document.getElementsByClassName("header-streak-count")[0].innerText =
    count + " day streak";
}

$(".header-streak-count").html('<div class="calebs-loader small"></div>');
