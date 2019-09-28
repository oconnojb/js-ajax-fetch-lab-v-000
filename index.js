const baseURL = 'https://api.github.com';
const user = 'oconnojb';

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return '';
}

function forkRepo() {
  const repo = 'learn-co-curriculum/js-ajax-fetch-lab';
  //use fetch to fork it!
  fetch(`${baseURL}/repos/${repo}/forks`, {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json()).then(json => showResults(json));
  //.then(res => showResults(res.json())).then(json => console.log(json));
}

function showResults(json) {
  //use this function to display the results from forking via the API
  var aTag = `<a href="${json['html_url']}" id="ayy">${json['full_name']}</a>`;
  //console.log(aTag);
  document.getElementById('results').innerHTML = aTag;
}

function createIssue() {
  //use this function to create an issue based on the values input in index.html
  var t = document.getElementById('title').value;
  var b = document.getElementById('body').value;
  //var a = document.getElementById('ayy').text;
  //console.log(a);
  const URL = `${baseURL}/repos/oconnojb/js-ajax-fetch-lab/issues`;
  const data = {
    "title": t,
    "body": b
  };

  //console.log(t + b + URL);

  fetch(URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json()).then(json => getIssues());
}

function getIssues() {
  //once an issue is submitted, fetch all open issues to see the issues you are creating
  // /repos/:owner/:repo/issues
  const apiURL = `${baseURL}/repos/oconnojb/js-ajax-fetch-lab/issues`;

  fetch(apiURL, {
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json()).then(json => displayIssues(json));
}

function displayIssues(json) {
  console.log("2", json);
  const issueList = `<ul>${json
    .map(
      b =>
        '<li><strong>' +
        b.title +
      //  '</strong> - ' +
      //  b.author.login +
        '</strong></li>'
    )
    .join('')}</ul>`;
  document.getElementById('issues').innerHTML = issueList;
}
