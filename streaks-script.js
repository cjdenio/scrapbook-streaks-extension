function coolThing() {
  if ($("#leaderboard tr").length > 1) {
    if (interval) {
      clearInterval(interval);
    }

    $(
      "#leaderboard td:last-child, #leaderboard2 td:last-child, #leaderboard3 td:last-child"
    ).html('<div class="calebs-loader"></div>');

    const url =
      'https://api2.hackclub.com/v0.1/Summer%20of%20Making%20Streaks/Slack%20Accounts?select={"maxRecords": 32,"fields":["Username","Streak Count"],"sort":[{"field": "Streak Count", "direction": "desc"}]}';
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        let streaks = {};
        resp.forEach((i) => {
          streaks["@" + i.fields["Username"]] = i.fields["Streak Count"];
        });

        $("#leaderboard tr, #leaderboard2 tr, #leaderboard3 tr").each(
          function () {
            $(this)
              .find("td:last-child")
              .text("🔥 " + streaks[$(this).find("td:first-child").text()]);
          }
        );
      })
      .catch((e) => {
        console.log("ERROR " + e.message);
      });

    // $("#leaderboard tr").each(function () {
    //   console.log($(this).find("td:first-child").text());
    // });
  }
}

coolThing();
let interval = setInterval(coolThing, 500);
