var currentTab = 'all';


function getStatusInfo(status) {
  if (status === 'interview') {
    return { text: 'INTERVIEW',   cls: 'status-interview' };
  }
  if (status === 'rejected') {
    return { text: 'REJECTED',    cls: 'status-rejected' };
  }
  return { text: 'NOT APPLIED',   cls: 'status-not-applied' };
}

function render() {
  var jobList  = document.getElementById('job-list');
  var emptyMsg = document.getElementById('empty-state');
  var countEl  = document.getElementById('jobs-count');

  var filteredJobs = jobs;
  if (currentTab === 'interview') {
    filteredJobs = jobs.filter(function(job) { return job.status === 'interview'; });
  }
  if (currentTab === 'rejected') {
    filteredJobs = jobs.filter(function(job) { return job.status === 'rejected'; });
  }

  var totalCount     = jobs.length;
  var interviewCount = jobs.filter(function(job) { return job.status === 'interview'; }).length;
  var rejectedCount  = jobs.filter(function(job) { return job.status === 'rejected'; }).length;

  document.getElementById('stat-total').textContent      = totalCount;
  document.getElementById('stat-interview').textContent  = interviewCount;
  document.getElementById('stat-struggling').textContent = rejectedCount;

  if (currentTab === 'all') {
    countEl.textContent = totalCount + ' jobs';
  } else {
    countEl.textContent = filteredJobs.length + ' of ' + totalCount + ' jobs';
  }

  if (filteredJobs.length === 0) {
    jobList.innerHTML = '';
    emptyMsg.classList.remove('hidden');
    return;
  }

  emptyMsg.classList.add('hidden');

  var html = '';

  for (var i = 0; i < filteredJobs.length; i++) {
    var job = filteredJobs[i];
    var statusInfo = getStatusInfo(job.status);

    var locationLine = job.location;
    if (job.type)   locationLine += ' • ' + job.type;
    if (job.salary) locationLine += ' • ' + job.salary;

    var descHTML = '';
    if (job.desc) {
      descHTML = '<p class="text-gray-400 text-sm mt-3 leading-relaxed">' + job.desc + '</p>';
    }

    html +=
      '<div class="job-card bg-white border border-gray-200 rounded-2xl p-6 fade-in" data-id="' + job.id + '">' +
        '<div class="flex items-start justify-between">' +
          '<div class="flex-1">' +
            '<h3 class="font-bold text-slate-800 text-base">' + job.company + '</h3>' +
            '<p class="text-gray-500 text-sm mt-0.5">' + job.title + '</p>' +
            '<p class="text-gray-400 text-sm mt-0.5">' + locationLine + '</p>' +
            '<span class="status-badge ' + statusInfo.cls + '">' + statusInfo.text + '</span>' +
            descHTML +
            '<div class="flex gap-2 mt-4">' +
              '<button class="action-btn interview" onclick="setStatus(' + job.id + ', \'interview\')">INTERVIEW</button>' +
              '<button class="action-btn rejected"  onclick="setStatus(' + job.id + ', \'rejected\')">REJECTED</button>' +
            '</div>' +
          '</div>' +
          '<button class="delete-btn" onclick="deleteJob(' + job.id + ', this)">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">' +
              '<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>' +
            '</svg>' +
          '</button>' +
        '</div>' +
      '</div>';
  }

  jobList.innerHTML = html;
}


function setStatus(jobId, newStatus) {
  for (var i = 0; i < jobs.length; i++) {
    if (jobs[i].id === jobId) {
      jobs[i].status = newStatus;
      break;
    }
  }
  render();
}


function deleteJob(jobId, button) {
  var card = button.closest('.job-card');

  card.classList.add('removing');

  card.addEventListener('animationend', function() {
    var newJobs = [];
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].id !== jobId) {
        newJobs.push(jobs[i]);
      }
    }
    jobs = newJobs;
    render();
  }, { once: true });
}


function setTab(tabName, clickedButton) {
  currentTab = tabName;

  var allTabs = document.querySelectorAll('.tab-btn');
  for (var i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove('active');
  }

  clickedButton.classList.add('active');

  render();
}

render();