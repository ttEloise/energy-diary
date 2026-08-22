(function () {
  'use strict';

  const STORAGE_KEY = 'energy-day.v1';
  const COLORS = ['#f9c6d2', '#bde0fe', '#c8f0d8', '#ffe6ad', '#d8d3ff', '#ffd8c2', '#f3d1f4', '#fde2c8'];
  const PRIORITIES = [
    { value: 0, label: '低', labelEn: 'Low' },
    { value: 1, label: '中', labelEn: 'Medium' },
    { value: 2, label: '高', labelEn: 'High' }
  ];
  const MOODS = [
    { key: 'joy', label: '喜', labelEn: 'Joy', emoji: '(^▽^)', color: '#f6b93b' },
    { key: 'anger', label: '怒', labelEn: 'Anger', emoji: '(｀へ´)', color: '#f16a6a' },
    { key: 'sorrow', label: '哀', labelEn: 'Sorrow', emoji: '(T_T)', color: '#5b8def' },
    { key: 'happy', label: '乐', labelEn: 'Happy', emoji: '(≧▽≦)ノ', color: '#34c98b' },
    { key: 'worry', label: '忧', labelEn: 'Worry', emoji: '(-_-;)', color: '#9a7bd8' },
    { key: 'calm', label: '平淡', labelEn: 'Calm', emoji: '(・_・)', color: '#8ed1c4' },
    { key: 'focus', label: '专注', labelEn: 'Focused', emoji: '(｀・ω・´)', color: '#4f9ff5' }
  ];
  const I18N = {
    zh: {
      appName: '能量手账',
      views: '视图',
      tabCalendar: '日历',
      tabDay: '今日',
      tabMonth: '月报',
      project: '项目',
      projectManage: '管理',
      projectTimeline: '时间线',
      newProject: '新项目',
      add: '添加',
      selectProject: '选择项目',
      prevMonth: '上个月',
      nextMonth: '下个月',
      prevDay: '前一天',
      nextDay: '后一天',
      today: '今天',
      weekdayMon: '一',
      weekdayTue: '二',
      weekdayWed: '三',
      weekdayThu: '四',
      weekdayFri: '五',
      weekdaySat: '六',
      weekdaySun: '日',
      hasRecord: '有记录',
      overLimit: '超支',
      netSpend: '净消耗',
      netRecover: '净恢复',
      energyCap: '能量上限',
      energyAmount: '所需能量',
      energyDirection: '能量方向',
      spend: '消耗',
      recover: '恢复',
      mood: '心情',
      moodSummaryLabel: '今日心情小结',
      moodSummaryPlaceholder: '写一句今天的心情...',
      tasks: '待办',
      filterProject: '按项目筛选',
      diary: '日记 · 备忘',
      recordCompleted: '记录完成项',
      memo: '备忘',
      praise: '今日夸夸',
      gratitude: '今日感恩',
      reflection: '今日反思',
      statTasks: '完成任务',
      statSpend: '消耗能量',
      statRecover: '恢复能量',
      statDays: '记录天数',
      statAvgCap: '平均上限',
      monthSub: '每日上限与消耗',
      chartTitle: '每日能量 × 心情',
      chartAria: '每日能量上限、消耗与恢复折线图',
      monthEmpty: '这个月还没有记录',
      task: '任务',
      taskPlaceholder: '写点什么',
      priority: '优先级',
      priorityLow: '低',
      priorityMedium: '中',
      priorityHigh: '高',
      note: '备注',
      optional: '可留空',
      delete: '删除',
      save: '保存',
      newTask: '新待办',
      newMemo: '新备忘',
      type: '类型',
      recordMood: '记录此刻心情',
      associate: '关联',
      noLink: '不关联',
      edit: '编辑',
      close: '关闭',
      markDone: '标记完成',
      markUndone: '标记未完成',
      editTask: '编辑待办',
      editMemo: '编辑备忘',
      editMoodLog: '编辑心情记录',
      deleteTask: '删除待办',
      deleteMemo: '删除备忘',
      deleteProject: '删除项目',
      done: '已完成',
      projectCount: '{count} 项',
      selectColor: '选择颜色',
      todayEnergy: '今日能量',
      allProjects: '全部项目',
      ungrouped: '未分组',
      addFirstTask: '添加第一个待办',
      noMemos: '今天还没有备忘',
      noProjects: '还没有项目',
      noProjectTasks: '这个项目还没有任务',
      noMoodRecords: '本月还没有心情记录',
      dateToday: '今天',
      datePast: '已过去',
      dateFuture: '未来',
      daysUnit: '天',
      remaining: '剩余',
      overBy: '超支',
      consumed: '消耗',
      recovered: '恢复',
      taskAssociate: '任务：',
      memoAssociate: '备忘：',
      completedSummary: '已完成任务：{count} 项，消耗 {spend}、恢复 {recover} 能量',
      completedSummarySpendOnly: '已完成任务：{count} 项，共消耗 {spend} 能量',
      taskDeleted: '待办已删除',
      memoDeleted: '备忘已删除',
      projectDeleted: '项目已删除',
      projectAdded: '项目已添加',
      moodRecorded: '心情已记录',
      moodDeleted: '心情记录已删除',
      noCompletedTasks: '还没有已完成的任务',
      writtenToDiary: '已完成任务已写入日记',
      overToday: '已超出今日能量 {n}',
      dataSaveFailed: '数据保存失败',
      undo: '撤销'
    },
    en: {
      appName: 'Energy Diary',
      views: 'Views',
      tabCalendar: 'Calendar',
      tabDay: 'Today',
      tabMonth: 'Month',
      project: 'Projects',
      projectManage: 'Manage',
      projectTimeline: 'Timeline',
      newProject: 'New project',
      add: 'Add',
      selectProject: 'Select project',
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
      prevDay: 'Previous day',
      nextDay: 'Next day',
      today: 'Today',
      weekdayMon: 'Mon',
      weekdayTue: 'Tue',
      weekdayWed: 'Wed',
      weekdayThu: 'Thu',
      weekdayFri: 'Fri',
      weekdaySat: 'Sat',
      weekdaySun: 'Sun',
      hasRecord: 'Recorded',
      overLimit: 'Over',
      netSpend: 'Net spend',
      netRecover: 'Net recover',
      energyCap: 'Energy cap',
      energyAmount: 'Energy amount',
      energyDirection: 'Energy direction',
      spend: 'Spend',
      recover: 'Recover',
      mood: 'Mood',
      moodSummaryLabel: 'Mood summary',
      moodSummaryPlaceholder: 'How is today feeling...',
      tasks: 'Tasks',
      filterProject: 'Filter by project',
      diary: 'Diary · Notes',
      recordCompleted: 'Log completed',
      memo: 'Memo',
      praise: 'Praise',
      gratitude: 'Gratitude',
      reflection: 'Reflection',
      statTasks: 'Tasks done',
      statSpend: 'Energy spent',
      statRecover: 'Energy recovered',
      statDays: 'Days recorded',
      statAvgCap: 'Avg cap',
      monthSub: 'Daily cap and energy',
      chartTitle: 'Daily energy × mood',
      chartAria: 'Line chart of daily energy cap, spend and recover',
      monthEmpty: 'No records this month',
      task: 'Task',
      taskPlaceholder: 'Write something',
      priority: 'Priority',
      priorityLow: 'Low',
      priorityMedium: 'Medium',
      priorityHigh: 'High',
      note: 'Note',
      optional: 'Optional',
      delete: 'Delete',
      save: 'Save',
      newTask: 'New task',
      newMemo: 'New memo',
      type: 'Type',
      recordMood: 'Log mood',
      associate: 'Link',
      noLink: 'No link',
      edit: 'Edit',
      close: 'Close',
      markDone: 'Mark done',
      markUndone: 'Mark not done',
      editTask: 'Edit task',
      editMemo: 'Edit memo',
      editMoodLog: 'Edit mood log',
      deleteTask: 'Delete task',
      deleteMemo: 'Delete memo',
      deleteProject: 'Delete project',
      done: 'Done',
      projectCount: '{count} items',
      selectColor: 'Select color',
      todayEnergy: 'Today energy',
      allProjects: 'All projects',
      ungrouped: 'Ungrouped',
      addFirstTask: 'Add your first task',
      noMemos: 'No memos today',
      noProjects: 'No projects yet',
      noProjectTasks: 'No tasks for this project',
      noMoodRecords: 'No mood records this month',
      dateToday: 'today',
      datePast: 'past',
      dateFuture: 'upcoming',
      daysUnit: 'days',
      remaining: 'Remaining',
      overBy: 'Over by',
      consumed: 'Spent',
      recovered: 'Recovered',
      taskAssociate: 'Task: ',
      memoAssociate: 'Memo: ',
      completedSummary: 'Completed {count} tasks, spent {spend}, recovered {recover} energy',
      completedSummarySpendOnly: 'Completed {count} tasks, spent {spend} energy',
      taskDeleted: 'Task deleted',
      memoDeleted: 'Memo deleted',
      projectDeleted: 'Project deleted',
      projectAdded: 'Project added',
      moodRecorded: 'Mood logged',
      moodDeleted: 'Mood log deleted',
      noCompletedTasks: 'No completed tasks yet',
      writtenToDiary: 'Completed tasks written to diary',
      overToday: 'Over today\u2019s energy by {n}',
      dataSaveFailed: 'Failed to save data',
      undo: 'Undo'
    }
  };
  const KIND_META = {
    plain: { label: '普通', labelEn: 'Plain', icon: 'pen' },
    praise: { label: '今日夸夸', labelEn: 'Praise', icon: 'sparkles' },
    gratitude: { label: '今日感恩', labelEn: 'Gratitude', icon: 'heart' },
    reflection: { label: '今日反思', labelEn: 'Reflection', icon: 'moon' },
    summary: { label: '任务记录', labelEn: 'Task Log', icon: 'check' }
  };
  const MEMO_PLACEHOLDER = {
    plain: { zh: '记点什么...', en: 'Write something...' },
    praise: { zh: '夸夸今天的自己...', en: 'Praise yourself today...' },
    gratitude: { zh: '今天想感谢...', en: 'What are you grateful for...' },
    reflection: { zh: '今天有什么想对自己说的...', en: 'What would you tell yourself...' }
  };
  const DAY_EMPTY = Object.freeze({ cap: 100, tasks: [], memos: [] });

  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  let state = loadState();
  let currentDate = startOfDay(new Date());
  let currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  let calendarMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  let editingTaskId = null;
  let editingMemoId = null;
  let editingMoodLogId = null;
  let pendingMemoKind = 'plain';
  let pendingMoodLogKey = 'joy';
  let selectedProjectColor = COLORS[0];
  let projectPanelTab = 'manage';
  let timelineProjectId = 'all';
  let toastTimer = null;
  let remoteSaveTimer = null;
  let lang = loadLang();

  function defaultState() {
    return {
      projects: [{ id: 'life', name: '生活', color: '#bde0fe' }],
      days: {}
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.projects) && parsed.days && typeof parsed.days === 'object') {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('读取本地数据失败', error);
    }
    return defaultState();
  }

  function loadLang() {
    try {
      return localStorage.getItem('energy-day.lang') === 'en' ? 'en' : 'zh';
    } catch (error) {
      return 'zh';
    }
  }

  function t(key, vars) {
    let text = (I18N[lang] && I18N[lang][key]) || I18N.zh[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.replace('{' + name + '}', vars[name]);
      });
    }
    return text;
  }

  function applyStaticI18n() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    updateLangToggle();
  }

  function updateLangToggle() {
    $('#langToggle').textContent = lang === 'zh' ? 'EN' : '中文';
  }

  function setLang(next) {
    lang = next;
    try {
      localStorage.setItem('energy-day.lang', lang);
    } catch (error) {}
    applyStaticI18n();
    applyStaticI18n();
    renderAll();
  }

  function save() {
    saveLocal();
    queueRemoteSave();
  }

  function saveLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('保存本地数据失败', error);
      showToast(t('dataSaveFailed'));
    }
  }

  function queueRemoteSave() {
    clearTimeout(remoteSaveTimer);
    remoteSaveTimer = setTimeout(sendRemoteState, 400);
  }

  function sendRemoteState() {
    fetch('api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    }).catch(function () {});
  }

  function initRemoteSync() {
    fetch('api/data')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('remote data unavailable');
        }
        return response.json();
      })
      .then(function (remote) {
        if (remote && remote.days && Object.keys(remote.days).length) {
          state = remote;
          saveLocal();
          renderAll();
        } else {
          sendRemoteState();
        }
      })
      .catch(function () {});
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function toISO(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function isToday(date) {
    return toISO(date) === toISO(startOfDay(new Date()));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  function getDay(dateStr) {
    return state.days[dateStr] || DAY_EMPTY;
  }

  function ensureDay(dateStr) {
    if (!state.days[dateStr]) {
      state.days[dateStr] = { cap: 100, tasks: [], memos: [] };
    }
    return state.days[dateStr];
  }

  function sumTaskEnergy(day, energyType) {
    return (day.tasks || []).filter(function (task) {
      return task.done && (energyType === 'recover' ? task.energyType === 'recover' : task.energyType !== 'recover');
    }).reduce(function (sum, task) {
      return sum + (Number(task.energy) || 0);
    }, 0);
  }

  function completedSpendEnergy(day) {
    return sumTaskEnergy(day, 'spend');
  }

  function completedRecoverEnergy(day) {
    return sumTaskEnergy(day, 'recover');
  }

  function completedEnergy(day) {
    return completedSpendEnergy(day) - completedRecoverEnergy(day);
  }

  function priorityLabel(value) {
    const found = PRIORITIES.find(function (item) {
      return item.value === value;
    });
    return found ? (lang === 'en' ? found.labelEn : found.label) : (lang === 'en' ? 'Low' : '低');
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    return pad(date.getHours()) + ':' + pad(date.getMinutes());
  }

  function projectById(id) {
    return state.projects.find(function (project) {
      return project.id === id;
    });
  }

  function moodByKey(key) {
    return MOODS.find(function (mood) {
      return mood.key === key;
    }) || null;
  }

  function moodTitle(mood) {
    return lang === 'en' ? mood.labelEn : mood.label;
  }

  function kindTitle(meta) {
    return lang === 'en' ? meta.labelEn : meta.label;
  }

  function memoPlaceholder(kind) {
    const item = MEMO_PLACEHOLDER[kind] || MEMO_PLACEHOLDER.plain;
    return lang === 'en' ? item.en : item.zh;
  }

  function compareTasks(a, b) {
    if (a.done !== b.done) {
      return a.done ? 1 : -1;
    }
    if ((b.priority || 0) !== (a.priority || 0)) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return (a.createdAt || 0) - (b.createdAt || 0);
  }

  function renderAll() {
    renderDate();
    renderEnergy();
    renderMoodPicker();
    renderMoodLogList();
    renderProjectFilter();
    renderTasks();
    renderMemos();
    renderProjectPanel();
    renderCalendar();
    renderMonth();
  }

  function renderDate() {
    const weekdays = lang === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[currentDate.getDay()];
    let sub = weekday;
    if (isToday(currentDate)) {
      sub += ' · ' + t('dateToday');
    } else if (currentDate.getTime() < startOfDay(new Date()).getTime()) {
      sub += ' · ' + t('datePast');
    } else {
      sub += ' · ' + t('dateFuture');
    }
    $('#dateMain').textContent = lang === 'en'
      ? (currentDate.getMonth() + 1) + '/' + currentDate.getDate()
      : (currentDate.getMonth() + 1) + '月' + currentDate.getDate() + '日';
    $('#dateSub').textContent = sub;
    $('#todayBtn').disabled = isToday(currentDate);
  }

  function renderEnergy() {
    const day = getDay(toISO(currentDate));
    const cap = day.cap == null ? 100 : day.cap;
    const spent = completedSpendEnergy(day);
    const recovered = completedRecoverEnergy(day);
    const used = spent - recovered;
    const over = used > cap;

    $('#capSlider').value = cap;
    $('#capValue').textContent = cap;
    $('#energyCap').textContent = cap;
    $('#energyInvested').textContent = Math.abs(used);
    $('#energyInvested').classList.toggle('over', over);
    $('#energySection').classList.toggle('over', over);
    $('#energyLabel').textContent = used > 0 ? t('netSpend') : (used < 0 ? t('netRecover') : t('netSpend'));
    let usedText = t('consumed') + ' ' + spent;
    if (recovered > 0) {
      usedText += ' · ' + t('recovered') + ' ' + recovered;
    }
    $('#energyUsedText').textContent = usedText;
    $('#energyTasksText').textContent = over ? t('overBy') + ' ' + (used - cap) : t('remaining') + ' ' + (cap - used) + ' / ' + cap;
    renderEnergySegments(used, cap, over);
  }

  function renderEnergySegments(used, cap, over) {
    const segmentCount = Math.max(1, Math.round(cap / 5));
    const filledCount = Math.min(segmentCount, Math.ceil(Math.abs(used) / 5));
    const direction = over ? 'over' : (used < 0 ? 'recover' : 'spend');
    let html = '';
    for (let i = 0; i < segmentCount; i += 1) {
      html += '<span class="energy-seg' + (i < filledCount ? ' filled ' + direction : '') + '"></span>';
    }
    $('#energySegments').innerHTML = html;
  }

  function onCapInput() {
    const cap = Number($('#capSlider').value);
    const day = getDay(toISO(currentDate));
    const spent = completedSpendEnergy(day);
    const recovered = completedRecoverEnergy(day);
    const used = spent - recovered;
    const over = used > cap;
    $('#capValue').textContent = cap;
    $('#energyCap').textContent = cap;
    $('#energyInvested').textContent = Math.abs(used);
    $('#energyInvested').classList.toggle('over', over);
    $('#energySection').classList.toggle('over', over);
    $('#energyLabel').textContent = used > 0 ? t('netSpend') : (used < 0 ? t('netRecover') : t('netSpend'));
    let usedText = t('consumed') + ' ' + spent;
    if (recovered > 0) {
      usedText += ' · ' + t('recovered') + ' ' + recovered;
    }
    $('#energyUsedText').textContent = usedText;
    $('#energyTasksText').textContent = over ? t('overBy') + ' ' + (used - cap) : t('remaining') + ' ' + (cap - used) + ' / ' + cap;
    renderEnergySegments(used, cap, over);
  }

  function onCapChange() {
    const cap = Number($('#capSlider').value);
    ensureDay(toISO(currentDate)).cap = cap;
    save();
    renderEnergy();
  }

  function renderMoodPicker() {
    const day = getDay(toISO(currentDate));
    const selected = day.mood || null;
    $('#moodSummary').value = day.moodSummary || '';
    $('#moodPicker').innerHTML = MOODS.map(function (mood) {
      return '<button type="button" class="mood-option' + (mood.key === selected ? ' active' : '') + '" data-mood="' + mood.key + '" title="' + moodTitle(mood) + '">' +
        '<span class="mood-emoji">' + mood.emoji + '</span>' +
      '</button>';
    }).join('');
  }

  function renderMoodLogList() {
    const day = getDay(toISO(currentDate));
    const logs = (day.moodLog || []).slice().sort(function (a, b) {
      return (a.createdAt || 0) - (b.createdAt || 0);
    });
    const list = $('#moodLogList');
    list.innerHTML = '';
    if (!logs.length) {
      return;
    }
    logs.forEach(function (log) {
      const mood = moodByKey(log.mood);
      const associateLabel = moodAssociateLabel(day, log);
      const row = document.createElement('div');
      row.className = 'mood-log-item';
      row.innerHTML =
        '<span class="mood-log-face">' + (mood ? mood.emoji : '') + '</span>' +
        '<div class="mood-log-main">' +
          '<div class="mood-log-time">' + formatTime(log.createdAt) + '</div>' +
          (log.note ? '<div class="mood-log-note">' + escapeHTML(log.note) + '</div>' : '') +
          (associateLabel ? '<span class="mood-log-associate">' + escapeHTML(associateLabel) + '</span>' : '') +
        '</div>' +
        '<div class="mood-log-actions">' +
          '<button class="mini-icon-btn" data-action="edit-mood-log" data-id="' + escapeHTML(log.id) + '" title="' + t('edit') + '" aria-label="' + t('edit') + '">' + icon('pencil') + '</button>' +
          '<button class="mini-icon-btn danger" data-action="delete-mood-log" data-id="' + escapeHTML(log.id) + '" title="' + t('delete') + '" aria-label="' + t('delete') + '">' + icon('trash') + '</button>' +
        '</div>';
      list.appendChild(row);
    });
  }

  function moodAssociateLabel(day, log) {
    if (log.associateType === 'task') {
      const task = (day.tasks || []).find(function (item) {
        return item.id === log.associateId;
      });
      return task ? t('taskAssociate') + (task.title || '') : '';
    }
    if (log.associateType === 'memo') {
      const memo = (day.memos || []).find(function (item) {
        return item.id === log.associateId;
      });
      return memo ? t('memoAssociate') + (memo.text || '').slice(0, 18) : '';
    }
    return '';
  }

  function renderMoodLogEmoji(activeKey) {
    $('#moodLogEmoji').innerHTML = MOODS.map(function (mood) {
      return '<button type="button" class="mood-option' + (mood.key === activeKey ? ' active' : '') + '" data-mood-log="' + mood.key + '">' +
        '<span class="mood-emoji">' + mood.emoji + '</span>' +
      '</button>';
    }).join('');
  }

  function renderMoodLogAssociateSelect(select, selectedValue) {
    const day = getDay(toISO(currentDate));
    let html = '<option value="">' + t('noLink') + '</option>';
    (day.tasks || []).forEach(function (task) {
      html += '<option value="task:' + escapeHTML(task.id) + '">' + t('taskAssociate') + escapeHTML(task.title || '') + '</option>';
    });
    (day.memos || []).forEach(function (memo) {
      html += '<option value="memo:' + escapeHTML(memo.id) + '">' + t('memoAssociate') + escapeHTML((memo.text || '').slice(0, 18)) + '</option>';
    });
    select.innerHTML = html;
    const stillExists = Array.from(select.options).some(function (option) {
      return option.value === selectedValue;
    });
    select.value = stillExists ? selectedValue : '';
  }

  function openMoodLogModal(logId) {
    editingMoodLogId = logId || null;
    const day = getDay(toISO(currentDate));
    const log = logId ? (day.moodLog || []).find(function (item) {
      return item.id === logId;
    }) : null;
    pendingMoodLogKey = log && moodByKey(log.mood) ? log.mood : 'joy';
    $('#moodLogNote').value = log ? log.note || '' : '';
    $('#moodLogTitle').textContent = log ? t('editMoodLog') : t('recordMood');
    renderMoodLogEmoji(pendingMoodLogKey);
    renderMoodLogAssociateSelect($('#moodLogAssociate'), log ? (log.associateType ? log.associateType + ':' + log.associateId : '') : '');
    $('#moodLogDelete').hidden = !log;
    $('#moodLogModal').hidden = false;
  }

  function saveMoodLog() {
    const mood = pendingMoodLogKey;
    const note = $('#moodLogNote').value.trim();
    const associateValue = $('#moodLogAssociate').value;
    let associateType = null;
    let associateId = null;
    if (associateValue) {
      const parts = associateValue.split(':');
      associateType = parts[0];
      associateId = parts.slice(1).join(':');
    }
    const day = ensureDay(toISO(currentDate));
    if (!day.moodLog) {
      day.moodLog = [];
    }
    if (editingMoodLogId) {
      const log = day.moodLog.find(function (item) {
        return item.id === editingMoodLogId;
      });
      if (log) {
        log.mood = mood;
        log.note = note;
        log.associateType = associateType;
        log.associateId = associateId;
      }
    } else {
      day.moodLog.push({
        id: uid(),
        mood: mood,
        note: note,
        associateType: associateType,
        associateId: associateId,
        createdAt: Date.now()
      });
    }
    day.mood = mood;
    save();
    closeModal('moodLogModal');
    renderAll();
    showToast(t('moodRecorded'));
  }

  function deleteMoodLog(logId) {
    const day = ensureDay(toISO(currentDate));
    if (!day.moodLog) {
      return;
    }
    const index = day.moodLog.findIndex(function (item) {
      return item.id === logId;
    });
    if (index < 0) {
      return;
    }
    const removed = day.moodLog.splice(index, 1)[0];
    if (day.mood === removed.mood) {
      const last = day.moodLog.slice().sort(function (a, b) {
        return (b.createdAt || 0) - (a.createdAt || 0);
      })[0];
      day.mood = last ? last.mood : null;
    }
    save();
    renderAll();
    showToast(t('moodDeleted'), t('undo'), function () {
      day.moodLog.splice(index, 0, removed);
      save();
      renderAll();
    });
  }

  function renderProjectFilter() {
    const select = $('#projectFilter');
    const previous = select.value;
    let html = '<option value="all">' + t('allProjects') + '</option><option value="none">' + t('ungrouped') + '</option>';
    state.projects.forEach(function (project) {
      html += '<option value="' + escapeHTML(project.id) + '">' + escapeHTML(project.name) + '</option>';
    });
    select.innerHTML = html;
    const stillExists = Array.from(select.options).some(function (option) {
      return option.value === previous;
    });
    select.value = stillExists ? previous : 'all';
  }

  function renderProjectSelect(select, selected) {
    let html = '<option value="">' + t('ungrouped') + '</option>';
    state.projects.forEach(function (project) {
      html += '<option value="' + escapeHTML(project.id) + '">' + escapeHTML(project.name) + '</option>';
    });
    select.innerHTML = html;
    const stillExists = Array.from(select.options).some(function (option) {
      return option.value === selected;
    });
    select.value = stillExists ? selected : '';
  }

  function renderTasks() {
    const day = getDay(toISO(currentDate));
    const filter = $('#projectFilter').value;
    const groups = [];
    const groupMap = {};

    day.tasks.slice().sort(compareTasks).forEach(function (task) {
      const projectId = task.projectId || '__none';
      if (filter === 'none' && task.projectId != null) {
        return;
      }
      if (filter !== 'all' && filter !== 'none' && task.projectId !== filter) {
        return;
      }
      if (!groupMap[projectId]) {
        const project = projectId === '__none' ? { name: t('ungrouped'), color: '#94a3b8' } : projectById(projectId);
        const group = {
          id: projectId,
          name: project ? project.name : t('ungrouped'),
          color: project ? project.color : '#94a3b8',
          tasks: []
        };
        groupMap[projectId] = group;
        groups.push(group);
      }
      groupMap[projectId].tasks.push(task);
    });

    const list = $('#taskList');
    list.innerHTML = '';

    if (!groups.length) {
      list.innerHTML = '<div class="empty-state"><button class="empty-action" data-action="add-task">' + icon('plus') + '<span>' + t('addFirstTask') + '</span></button></div>';
      return;
    }

    groups.forEach(function (group) {
      const groupEl = document.createElement('div');
      groupEl.className = 'task-group';
      const doneCount = group.tasks.filter(function (task) {
        return task.done;
      }).length;
      const head = document.createElement('div');
      head.className = 'task-group-head';
      head.innerHTML = '<span class="project-dot" style="background:' + escapeHTML(group.color) + '"></span><span>' + escapeHTML(group.name) + '</span><span class="count">' + doneCount + '/' + group.tasks.length + '</span>';
      groupEl.appendChild(head);
      group.tasks.forEach(function (task) {
        groupEl.appendChild(createTaskRow(task));
      });
      list.appendChild(groupEl);
    });
  }

  function createTaskRow(task) {
    const row = document.createElement('div');
    row.className = 'task-row' + (task.done ? ' done' : '');
    const checkLabel = task.done ? t('markUndone') : t('markDone');
    const energyType = task.energyType === 'recover' ? 'recover' : 'spend';
    const energySign = energyType === 'recover' ? '+' : '';
    row.innerHTML =
      '<button class="task-check' + (task.done ? ' checked' : '') + '" data-action="toggle" data-id="' + escapeHTML(task.id) + '" aria-label="' + checkLabel + '">' + (task.done ? icon('check') : '') + '</button>' +
      '<div class="task-main">' +
        '<div class="task-title">' + escapeHTML(task.title || '') + '</div>' +
        '<div class="task-meta">' +
          '<span class="chip energy-chip ' + energyType + '">' + icon('zap') + energySign + (Number(task.energy) || 0) + '</span>' +
          '<span class="chip priority-' + (task.priority == null ? 1 : task.priority) + '">' + priorityLabel(task.priority) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="task-actions">' +
        '<button class="mini-icon-btn" data-action="edit" data-id="' + escapeHTML(task.id) + '" title="' + t('edit') + '" aria-label="' + t('edit') + '">' + icon('pencil') + '</button>' +
        '<button class="mini-icon-btn danger" data-action="delete" data-id="' + escapeHTML(task.id) + '" title="' + t('delete') + '" aria-label="' + t('delete') + '">' + icon('trash') + '</button>' +
      '</div>';
    return row;
  }

  function onTaskListClick(event) {
    const button = event.target.closest('button');
    if (!button) {
      return;
    }
    const action = button.dataset.action;
    if (action === 'add-task') {
      openTaskModal();
      return;
    }
    const taskId = button.dataset.id;
    if (!taskId) {
      return;
    }
    if (action === 'toggle') {
      toggleTask(taskId);
    } else if (action === 'edit') {
      openTaskModal(taskId);
    } else if (action === 'delete') {
      deleteTask(taskId);
    }
  }

  function openTaskModal(taskId) {
    editingTaskId = taskId || null;
    const day = getDay(toISO(currentDate));
    const task = taskId ? day.tasks.find(function (item) {
      return item.id === taskId;
    }) : null;

    $('#taskModalTitle').textContent = task ? t('editTask') : t('newTask');
    $('#taskTitle').value = task ? task.title || '' : '';
    $('#taskNote').value = task ? task.note || '' : '';
    renderProjectSelect($('#taskProject'), task ? task.projectId || '' : '');

    const priority = task && task.priority != null ? task.priority : 1;
    $$('#taskPriority button').forEach(function (button) {
      button.classList.toggle('active', Number(button.dataset.value) === priority);
    });
    const energyType = task && task.energyType === 'recover' ? 'recover' : 'spend';
    $$('#taskEnergyType button').forEach(function (button) {
      button.classList.toggle('active', button.dataset.energyType === energyType);
    });

    const energy = task && task.energy != null ? task.energy : 10;
    $('#taskEnergy').value = energy;
    $('#taskEnergyValue').textContent = energy;
    $('#deleteTaskBtn').hidden = !task;
    $('#taskModal').hidden = false;
    requestAnimationFrame(function () {
      $('#taskTitle').focus();
    });
  }

  function saveTask(event) {
    event.preventDefault();
    const title = $('#taskTitle').value.trim();
    if (!title) {
      $('#taskTitle').focus();
      return;
    }
    const dateStr = toISO(currentDate);
    const day = ensureDay(dateStr);
    const projectId = $('#taskProject').value || null;
    const priority = Number($$('#taskPriority button.active')[0] ? $$('#taskPriority button.active')[0].dataset.value : 1);
    const energyType = $$('#taskEnergyType button.active')[0] ? $$('#taskEnergyType button.active')[0].dataset.energyType : 'spend';
    const energy = Number($('#taskEnergy').value);
    const note = $('#taskNote').value.trim();

    if (editingTaskId) {
      const task = day.tasks.find(function (item) {
        return item.id === editingTaskId;
      });
      if (task) {
        task.title = title;
        task.projectId = projectId;
        task.priority = priority;
        task.energyType = energyType;
        task.energy = energy;
        task.note = note;
      }
    } else {
      day.tasks.push({
        id: uid(),
        title: title,
        projectId: projectId,
        priority: priority,
        energyType: energyType,
        energy: energy,
        note: note,
        done: false,
        createdAt: Date.now(),
        doneAt: null
      });
    }
    save();
    closeModal('taskModal');
    renderAll();
  }

  function toggleTask(taskId) {
    const day = ensureDay(toISO(currentDate));
    const task = day.tasks.find(function (item) {
      return item.id === taskId;
    });
    if (!task) {
      return;
    }
    task.done = !task.done;
    task.doneAt = task.done ? Date.now() : null;
    save();
    renderAll();
    if (task.done) {
      const cap = day.cap == null ? 100 : day.cap;
      const used = completedEnergy(day);
      if (used > cap) {
        showToast(t('overToday', { n: used - cap }));
      }
    }
  }

  function deleteTask(taskId) {
    const day = ensureDay(toISO(currentDate));
    const index = day.tasks.findIndex(function (item) {
      return item.id === taskId;
    });
    if (index < 0) {
      return;
    }
    const removed = day.tasks.splice(index, 1)[0];
    save();
    renderAll();
    showToast(t('taskDeleted'), t('undo'), function () {
      day.tasks.splice(index, 0, removed);
      save();
      renderAll();
    });
  }

  function renderMemos() {
    const day = getDay(toISO(currentDate));
    const memos = (day.memos || []).slice().sort(function (a, b) {
      return (a.createdAt || 0) - (b.createdAt || 0);
    });
    const list = $('#memoList');
    list.innerHTML = '';

    if (!memos.length) {
      list.innerHTML = '<div class="empty-state">' + icon('pen') + '<span>' + t('noMemos') + '</span></div>';
    } else {
      memos.forEach(function (memo) {
        const kind = memo.kind || 'plain';
        const meta = KIND_META[kind] || KIND_META.plain;
        const row = document.createElement('div');
        row.className = 'memo-row kind-' + escapeHTML(kind);
        row.innerHTML =
          '<div class="memo-head">' +
            '<span class="memo-kind ' + escapeHTML(kind) + '">' + icon(meta.icon) + kindTitle(meta) + '</span>' +
            '<span class="memo-time">' + formatTime(memo.createdAt) + '</span>' +
          '</div>' +
          '<div class="memo-text">' + escapeHTML(memo.text || '') + '</div>' +
          '<div class="memo-actions">' +
            '<button class="mini-icon-btn" data-action="edit-memo" data-id="' + escapeHTML(memo.id) + '" title="' + t('edit') + '" aria-label="' + t('edit') + '">' + icon('pencil') + '</button>' +
            '<button class="mini-icon-btn danger" data-action="delete-memo" data-id="' + escapeHTML(memo.id) + '" title="' + t('delete') + '" aria-label="' + t('delete') + '">' + icon('trash') + '</button>' +
          '</div>';
        list.appendChild(row);
      });
    }

    const doneCount = getDay(toISO(currentDate)).tasks.filter(function (task) {
      return task.done;
    }).length;
    $('#summaryBtn').disabled = doneCount === 0;
  }

  function onMemoListClick(event) {
    const button = event.target.closest('button');
    if (!button) {
      return;
    }
    const memoId = button.dataset.id;
    if (button.dataset.action === 'edit-memo') {
      openMemoModal('plain', memoId);
    } else if (button.dataset.action === 'delete-memo') {
      deleteMemo(memoId);
    }
  }

  function openMemoModal(kind, memoId) {
    editingMemoId = memoId || null;
    const day = getDay(toISO(currentDate));
    const memo = memoId ? (day.memos || []).find(function (item) {
      return item.id === memoId;
    }) : null;
    pendingMemoKind = memo ? (memo.kind || 'plain') : kind;
    $('#memoText').value = memo ? memo.text || '' : '';
    $('#memoModalTitle').textContent = memo ? t('editMemo') : kindTitle(KIND_META[pendingMemoKind]);
    renderMemoKindChips(pendingMemoKind);
    $('#memoText').placeholder = memoPlaceholder(pendingMemoKind);
    $('#memoModal').hidden = false;
    requestAnimationFrame(function () {
      $('#memoText').focus();
    });
  }

  function renderMemoKindChips(activeKind) {
    const kinds = ['plain', 'praise', 'gratitude', 'reflection'];
    $('#memoKindChips').innerHTML = kinds.map(function (kind) {
      return '<button type="button" class="kind-chip' + (kind === activeKind ? ' active' : '') + '" data-kind="' + kind + '">' + icon(KIND_META[kind].icon) + kindTitle(KIND_META[kind]) + '</button>';
    }).join('');
  }

  function saveMemo(event) {
    event.preventDefault();
    const text = $('#memoText').value.trim();
    if (!text) {
      $('#memoText').focus();
      return;
    }
    const dateStr = toISO(currentDate);
    const day = ensureDay(dateStr);
    if (!day.memos) {
      day.memos = [];
    }
    if (editingMemoId) {
      const memo = day.memos.find(function (item) {
        return item.id === editingMemoId;
      });
      if (memo) {
        memo.text = text;
        memo.kind = pendingMemoKind;
      }
    } else {
      day.memos.push({
        id: uid(),
        kind: pendingMemoKind,
        text: text,
        createdAt: Date.now()
      });
    }
    save();
    closeModal('memoModal');
    renderAll();
  }

  function deleteMemo(memoId) {
    const day = ensureDay(toISO(currentDate));
    if (!day.memos) {
      return;
    }
    const index = day.memos.findIndex(function (item) {
      return item.id === memoId;
    });
    if (index < 0) {
      return;
    }
    const removed = day.memos.splice(index, 1)[0];
    save();
    renderAll();
    showToast(t('memoDeleted'), t('undo'), function () {
      day.memos.splice(index, 0, removed);
      save();
      renderAll();
    });
  }

  function addSummaryMemo() {
    const day = ensureDay(toISO(currentDate));
    const doneTasks = day.tasks.filter(function (task) {
      return task.done;
    });
    if (!doneTasks.length) {
      showToast(t('noCompletedTasks'));
      return;
    }
    const lines = doneTasks.map(function (task, index) {
      const sign = task.energyType === 'recover' ? '+' : '';
      const energyText = lang === 'en' ? sign + (Number(task.energy) || 0) + ' energy' : '（' + sign + (Number(task.energy) || 0) + ' 能量）';
      return (index + 1) + '. ' + (task.title || '') + (lang === 'en' ? ' (' + energyText + ')' : energyText);
    });
    const spendTotal = completedSpendEnergy(day);
    const recoverTotal = completedRecoverEnergy(day);
    if (!day.memos) {
      day.memos = [];
    }
    let summary;
    if (recoverTotal > 0) {
      summary = t('completedSummary', { count: doneTasks.length, spend: spendTotal, recover: recoverTotal });
    } else {
      summary = t('completedSummarySpendOnly', { count: doneTasks.length, spend: spendTotal });
    }
    day.memos.push({
      id: uid(),
      kind: 'summary',
      text: summary + '\n\n' + lines.join('\n'),
      createdAt: Date.now()
    });
    save();
    renderAll();
    showToast(t('writtenToDiary'));
  }

  function renderProjectPanel() {
    const list = $('#projectManageList');
    if (!state.projects.length) {
      list.innerHTML = '<div class="empty-state">' + icon('folder') + '<span>' + t('noProjects') + '</span></div>';
    } else {
      list.innerHTML = '';
      state.projects.forEach(function (project) {
        const count = Object.values(state.days).reduce(function (sum, day) {
          return sum + (day.tasks || []).filter(function (task) {
            return task.projectId === project.id;
          }).length;
        }, 0);
        const row = document.createElement('div');
        row.className = 'project-manage-row';
        row.innerHTML =
          '<span class="project-dot" style="background:' + escapeHTML(project.color) + '"></span>' +
          '<input class="project-name-input" data-id="' + escapeHTML(project.id) + '" value="' + escapeHTML(project.name) + '" maxlength="20" aria-label="' + t('project') + '">' +
          '<span class="project-count">' + t('projectCount', { count: count }) + '</span>' +
          '<button class="mini-icon-btn danger" data-action="delete-project" data-id="' + escapeHTML(project.id) + '" title="' + t('deleteProject') + '" aria-label="' + t('deleteProject') + '">' + icon('trash') + '</button>';
        list.appendChild(row);
      });
    }
    renderTimelineProjectSelect($('#timelineProject'));
    renderProjectTimeline();
  }

  function renderTimelineProjectSelect(select) {
    let html = '<option value="all">' + t('allProjects') + '</option>';
    state.projects.forEach(function (project) {
      html += '<option value="' + escapeHTML(project.id) + '">' + escapeHTML(project.name) + '</option>';
    });
    select.innerHTML = html;
    const stillExists = Array.from(select.options).some(function (option) {
      return option.value === timelineProjectId;
    });
    select.value = stillExists ? timelineProjectId : 'all';
    timelineProjectId = select.value;
  }

  function renderProjectTimeline() {
    const list = $('#projectTimeline');
    const items = [];
    Object.keys(state.days).forEach(function (iso) {
      const day = state.days[iso];
      (day.tasks || []).forEach(function (task) {
        if (timelineProjectId === 'all' || task.projectId === timelineProjectId) {
          items.push({ iso: iso, task: task });
        }
      });
    });
    items.sort(function (a, b) {
      const dateOrder = b.iso.localeCompare(a.iso);
      return dateOrder || ((b.task.createdAt || 0) - (a.task.createdAt || 0));
    });
    list.innerHTML = '';
    if (!items.length) {
      list.innerHTML = '<div class="empty-state">' + icon('folder') + '<span>' + t('noProjectTasks') + '</span></div>';
      return;
    }
    items.forEach(function (item) {
      const parts = item.iso.split('-').map(Number);
      const dateLabel = lang === 'en' ? parts[1] + '/' + parts[2] : parts[1] + '月' + parts[2] + '日';
      const project = item.task.projectId ? projectById(item.task.projectId) : null;
      const color = project ? project.color : '#b7c8d8';
      const projectLabel = project ? project.name : t('ungrouped');
      const energyType = item.task.energyType === 'recover' ? 'recover' : 'spend';
      const energySign = energyType === 'recover' ? '+' : '';
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'timeline-item';
      row.dataset.iso = item.iso;
      row.innerHTML =
        '<span class="timeline-dot" style="background:' + escapeHTML(color) + '"></span>' +
        '<span class="timeline-card">' +
          '<span class="timeline-date">' + dateLabel + ' · ' + escapeHTML(projectLabel) + '</span>' +
          '<div class="timeline-title">' + escapeHTML(item.task.title || '') + '</div>' +
          '<span class="timeline-meta">' +
            '<span class="chip energy-chip ' + energyType + '">' + icon('zap') + energySign + (Number(item.task.energy) || 0) + '</span>' +
            '<span class="chip priority-' + (item.task.priority == null ? 1 : item.task.priority) + '">' + priorityLabel(item.task.priority) + '</span>' +
            (item.task.done ? '<span class="chip priority-0">' + t('done') + '</span>' : '') +
          '</span>' +
        '</span>';
      list.appendChild(row);
    });
  }

  function onProjectListClick(event) {
    const button = event.target.closest('button');
    if (button && button.dataset.action === 'delete-project') {
      deleteProject(button.dataset.id);
    }
  }

  function renameProject(event) {
    const input = event.target;
    if (!input.classList.contains('project-name-input')) {
      return;
    }
    const project = projectById(input.dataset.id);
    const name = input.value.trim();
    if (project && name) {
      project.name = name;
      save();
    }
    renderProjectPanel();
    renderProjectFilter();
  }

  function deleteProject(projectId) {
    const index = state.projects.findIndex(function (project) {
      return project.id === projectId;
    });
    if (index < 0) {
      return;
    }
    const removed = state.projects.splice(index, 1)[0];
    const affected = [];
    Object.values(state.days).forEach(function (day) {
      (day.tasks || []).forEach(function (task) {
        if (task.projectId === projectId) {
          affected.push(task);
          task.projectId = null;
        }
      });
    });
    save();
    renderAll();
    showToast(t('projectDeleted'), t('undo'), function () {
      state.projects.splice(index, 0, removed);
      affected.forEach(function (task) {
        task.projectId = projectId;
      });
      save();
      renderAll();
    });
  }

  function setView(view) {
    $$('.tab').forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.view === view);
    });
    $('#calendarView').classList.toggle('active', view === 'calendar');
    $('#dayView').classList.toggle('active', view === 'day');
    $('#monthView').classList.toggle('active', view === 'month');
    $('#floatingMoodBtn').hidden = view !== 'day';
    if (view === 'month') {
      renderMonth();
    }
    setProjectPanelOpen(false);
    window.scrollTo({ top: 0 });
  }

  function setProjectPanelOpen(open) {
    const panel = $('#projectPanel');
    panel.hidden = !open;
    $('#projectToggle').setAttribute('aria-expanded', String(open));
    if (open) {
      renderProjectPanel();
    }
  }

  function setProjectPanelTab(tab) {
    projectPanelTab = tab;
    $$('.project-tab').forEach(function (button) {
      button.classList.toggle('active', button.dataset.projectTab === tab);
    });
    $('#projectManageView').hidden = tab !== 'manage';
    $('#projectTimelineView').hidden = tab !== 'timeline';
  }

  function renderCalendar() {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayISO = toISO(startOfDay(new Date()));
    const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
    $('#calendarMonthTitle').textContent = lang === 'en' ? year + '-' + pad(month + 1) : year + '年' + (month + 1) + '月';
    $('#calendarSub').textContent = daysInMonth + ' ' + t('daysUnit');

    let html = '';
    for (let i = 0; i < firstOffset; i += 1) {
      html += '<div class="cal-cell empty"></div>';
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = year + '-' + pad(month + 1) + '-' + pad(day);
      const dayData = state.days[iso];
      const mood = moodByKey(dayData && dayData.mood);
      const cap = dayData && dayData.cap != null ? dayData.cap : 100;
      const spent = dayData ? completedSpendEnergy(dayData) : 0;
      const recovered = dayData ? completedRecoverEnergy(dayData) : 0;
      const used = spent - recovered;
      const hasEnergy = spent > 0 || recovered > 0;
      const hasData = !!dayData && ((dayData.tasks && dayData.tasks.length) || (dayData.memos && dayData.memos.length) || dayData.cap != null || !!dayData.mood);
      const isToday = iso === todayISO;
      const over = hasEnergy && used > cap;
      const status = hasEnergy ? (over ? 'over' : (used > 0 ? 'progressing' : (used < 0 ? 'relaxing' : 'balanced'))) : null;
      let classes = 'cal-cell';
      if (isToday) {
        classes += ' today';
      }
      if (hasData) {
        classes += ' data';
      }
      if (over) {
        classes += ' over';
      }
      html += '<button type="button" class="' + classes + '" data-iso="' + iso + '">';
      html += '<span class="cal-head">';
      html += '<span class="cal-day">' + day + '</span>';
      if (status) {
        html += '<span class="cal-status-label ' + status + '">' + status + '</span>';
      }
      html += '</span>';
      if (hasData) {
        if (hasEnergy) {
          const absNet = Math.abs(used);
          const percent = Math.min(100, (absNet / cap) * 100);
          const fillClass = over ? 'red' : (used > 0 ? 'blue' : (used < 0 ? 'green' : ''));
          const statsText = used > 0 ? t('netSpend') + ' ' + used : (used < 0 ? t('netRecover') + ' ' + (-used) : t('netSpend') + ' 0');
          html += '<span class="cal-energy-stats">' + statsText + '</span>';
          html += '<span class="cal-net-track"><span class="cal-net-fill ' + fillClass + '" style="width:' + percent + '%"></span></span>';
          html += '<span class="cal-remaining">' + (over ? t('overBy') + ' ' + (used - cap) : t('remaining') + ' ' + (cap - used) + ' / ' + cap) + '</span>';
        }
      }
      if (mood) {
        html += '<span class="cal-mood">' + mood.emoji + '</span>';
      }
      html += '</button>';
    }
    $('#calendarGrid').innerHTML = html;
  }

  function renderMonth() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    $('#monthTitle').textContent = lang === 'en' ? year + '-' + pad(month + 1) : year + '年' + (month + 1) + '月';

    let doneCount = 0;
    let spendTotal = 0;
    let recoverTotal = 0;
    let capTotal = 0;
    let daysWithData = 0;
    const series = [];

    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = year + '-' + pad(month + 1) + '-' + pad(day);
      const dayData = state.days[iso];
      const hasData = dayData && ((dayData.tasks && dayData.tasks.length) || (dayData.memos && dayData.memos.length) || dayData.cap != null || !!dayData.mood);
      const cap = dayData && dayData.cap != null ? dayData.cap : null;
      const spend = dayData ? completedSpendEnergy(dayData) : null;
      const recover = dayData ? completedRecoverEnergy(dayData) : null;
      series.push({ cap: cap, spend: hasData ? spend : null, recover: hasData ? recover : null, hasData: !!hasData, mood: dayData ? (dayData.mood || null) : null });

      if (hasData) {
        daysWithData += 1;
        doneCount += (dayData.tasks || []).filter(function (task) {
          return task.done;
        }).length;
        spendTotal += completedSpendEnergy(dayData);
        recoverTotal += completedRecoverEnergy(dayData);
        capTotal += cap == null ? 100 : cap;
      }
    }

    $('#statTasks').textContent = doneCount;
    $('#statEnergy').textContent = spendTotal;
    $('#statRecovered').textContent = recoverTotal;
    $('#statDays').textContent = daysWithData;
    $('#statAvgCap').textContent = daysWithData ? Math.round(capTotal / daysWithData) : 100;
    renderMoodMonthStats(year, month, daysInMonth);

    const svg = $('#energyChart');
    const empty = $('#chartEmpty');
    if (!daysWithData) {
      svg.hidden = true;
      empty.hidden = false;
      return;
    }
    svg.hidden = false;
    empty.hidden = true;

    const W = 700;
    const H = 260;
    const L = 44;
    const R = 16;
    const T = 22;
    const B = 30;
    const plotW = W - L - R;
    const plotH = H - T - B;
    let maxValue = 100;
    series.forEach(function (point) {
      if (point.cap != null) {
        maxValue = Math.max(maxValue, point.cap);
      }
      if (point.spend != null) {
        maxValue = Math.max(maxValue, point.spend);
      }
      if (point.recover != null) {
        maxValue = Math.max(maxValue, point.recover);
      }
    });
    const niceMax = Math.max(100, Math.ceil(maxValue / 25) * 25);
    const xFor = function (day) {
      return L + (day - 1) * (plotW / Math.max(1, daysInMonth - 1));
    };
    const yFor = function (value) {
      return T + plotH * (1 - value / niceMax);
    };

    let markup = '';
    const tickCount = 4;
    for (let i = 0; i <= tickCount; i += 1) {
      const value = niceMax * i / tickCount;
      const y = yFor(value);
      markup += '<line class="grid-line" x1="' + L + '" y1="' + y + '" x2="' + (W - R) + '" y2="' + y + '"></line>';
      markup += '<text class="axis-label" x="' + (L - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + value + '</text>';
    }

    const labelStep = Math.max(1, Math.ceil(daysInMonth / 12));
    for (let day = 1; day <= daysInMonth; day += labelStep) {
      markup += '<text class="axis-label" x="' + xFor(day) + '" y="' + (H - 6) + '" text-anchor="middle">' + day + '</text>';
    }

    const capPath = buildPath(series.map(function (point) {
      return point.cap;
    }), xFor, yFor);
    const spendPath = buildPath(series.map(function (point) {
      return point.spend;
    }), xFor, yFor);
    const recoverPath = buildPath(series.map(function (point) {
      return point.recover;
    }), xFor, yFor);
    markup += '<path class="line cap-line" d="' + capPath + '"></path>';
    markup += '<path class="line spend-line" d="' + spendPath + '"></path>';
    markup += '<path class="line recover-line" d="' + recoverPath + '"></path>';

    series.forEach(function (point, index) {
      if (point.hasData && point.mood) {
        const mood = moodByKey(point.mood);
        if (mood) {
          const moodY = point.spend != null ? yFor(point.spend) : yFor(0);
          markup += '<circle class="mood-point" cx="' + xFor(index + 1) + '" cy="' + moodY + '" r="5" fill="' + mood.color + '"></circle>';
        }
      }
    });
    svg.innerHTML = markup;
  }

  function renderMoodMonthStats(year, month, daysInMonth) {
    const counts = {};
    let total = 0;
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = year + '-' + pad(month + 1) + '-' + pad(day);
      const dayData = state.days[iso];
      if (dayData && dayData.mood) {
        counts[dayData.mood] = (counts[dayData.mood] || 0) + 1;
        total += 1;
      }
    }
    const el = $('#moodMonthStats');
    if (!total) {
      el.innerHTML = '<span class="empty-note">' + t('noMoodRecords') + '</span>';
      return;
    }
    el.innerHTML = MOODS.map(function (mood) {
      return '<span class="mood-count" style="background:' + mood.color + '22" title="' + moodTitle(mood) + '">' + mood.emoji + ' ' + (counts[mood.key] || 0) + '</span>';
    }).join('');
  }

  function buildPath(values, xFor, yFor) {
    let path = '';
    let drawing = false;
    values.forEach(function (value, index) {
      if (value == null) {
        drawing = false;
        return;
      }
      const x = xFor(index + 1);
      const y = yFor(value);
      path += drawing ? ' L' + x.toFixed(1) + ',' + y.toFixed(1) : ' M' + x.toFixed(1) + ',' + y.toFixed(1);
      drawing = true;
    });
    return path;
  }

  function closeModal(id) {
    $('#' + id).hidden = true;
    if (id === 'taskModal') {
      editingTaskId = null;
    }
    if (id === 'memoModal') {
      editingMemoId = null;
    }
    if (id === 'moodLogModal') {
      editingMoodLogId = null;
    }
  }

  function showToast(message, actionLabel, onAction) {
    const toast = $('#toast');
    toast.innerHTML = '';
    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(text);
    if (actionLabel && onAction) {
      const button = document.createElement('button');
      button.textContent = actionLabel;
      button.addEventListener('click', function () {
        clearTimeout(toastTimer);
        toast.classList.remove('show');
        onAction();
      });
      toast.appendChild(button);
    }
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 3200);
  }

  function init() {
    $$('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        setView(tab.dataset.view);
      });
    });

    $('#prevDay').addEventListener('click', function () {
      currentDate.setDate(currentDate.getDate() - 1);
      renderAll();
    });
    $('#nextDay').addEventListener('click', function () {
      currentDate.setDate(currentDate.getDate() + 1);
      renderAll();
    });
    $('#todayBtn').addEventListener('click', function () {
      currentDate = startOfDay(new Date());
      renderAll();
    });

    $('#capSlider').addEventListener('input', onCapInput);
    $('#capSlider').addEventListener('change', onCapChange);
    $('#energyToggle').addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      $('#energySettings').hidden = expanded;
      $('#energySection').classList.toggle('open', !expanded);
    });

    $('#addTaskBtn').addEventListener('click', function () {
      openTaskModal();
    });
    $('#taskList').addEventListener('click', onTaskListClick);
    $('#taskForm').addEventListener('submit', saveTask);
    $('#deleteTaskBtn').addEventListener('click', function () {
      if (editingTaskId) {
        deleteTask(editingTaskId);
      }
      closeModal('taskModal');
    });
    $('#taskPriority').addEventListener('click', function (event) {
      const button = event.target.closest('button');
      if (button) {
        $$('#taskPriority button').forEach(function (item) {
          item.classList.toggle('active', item === button);
        });
      }
    });
    $('#taskEnergyType').addEventListener('click', function (event) {
      const button = event.target.closest('button');
      if (button) {
        $$('#taskEnergyType button').forEach(function (item) {
          item.classList.toggle('active', item === button);
        });
      }
    });
    $('#taskEnergy').addEventListener('input', function () {
      $('#taskEnergyValue').textContent = this.value;
    });

    $('#addMemoBtn').addEventListener('click', function () {
      openMemoModal('plain');
    });
    $('#praiseBtn').addEventListener('click', function () {
      openMemoModal('praise');
    });
    $('#gratitudeBtn').addEventListener('click', function () {
      openMemoModal('gratitude');
    });
    $('#reflectionBtn').addEventListener('click', function () {
      openMemoModal('reflection');
    });
    $('#memoList').addEventListener('click', onMemoListClick);
    $('#memoForm').addEventListener('submit', saveMemo);
    $('#memoKindChips').addEventListener('click', function (event) {
      const button = event.target.closest('button');
      if (!button) {
        return;
      }
      pendingMemoKind = button.dataset.kind;
      renderMemoKindChips(pendingMemoKind);
      $('#memoText').placeholder = memoPlaceholder(pendingMemoKind);
    });
    $('#summaryBtn').addEventListener('click', addSummaryMemo);
    $('#moodPicker').addEventListener('click', function (event) {
      const button = event.target.closest('.mood-option');
      if (!button) {
        return;
      }
      const key = button.dataset.mood;
      const day = ensureDay(toISO(currentDate));
      day.mood = day.mood === key ? null : key;
      save();
      renderAll();
    });
    $('#moodSummary').addEventListener('change', function () {
      ensureDay(toISO(currentDate)).moodSummary = this.value.trim();
      save();
      renderAll();
    });
    $('#floatingMoodBtn').addEventListener('click', function () {
      openMoodLogModal();
    });
    $('#moodLogEmoji').addEventListener('click', function (event) {
      const button = event.target.closest('button');
      if (!button) {
        return;
      }
      pendingMoodLogKey = button.dataset.moodLog;
      renderMoodLogEmoji(pendingMoodLogKey);
    });
    $('#moodLogSave').addEventListener('click', saveMoodLog);
    $('#moodLogDelete').addEventListener('click', function () {
      if (editingMoodLogId) {
        deleteMoodLog(editingMoodLogId);
      }
      closeModal('moodLogModal');
    });
    $('#moodLogList').addEventListener('click', function (event) {
      const button = event.target.closest('button');
      if (!button) {
        return;
      }
      const action = button.dataset.action;
      if (action === 'edit-mood-log') {
        openMoodLogModal(button.dataset.id);
      } else if (action === 'delete-mood-log') {
        deleteMoodLog(button.dataset.id);
      }
    });

    $('#projectToggle').addEventListener('click', function () {
      setProjectPanelOpen($('#projectPanel').hidden);
    });
    $('#langToggle').addEventListener('click', function () {
      setLang(lang === 'zh' ? 'en' : 'zh');
    });
    $$('.project-tab').forEach(function (button) {
      button.addEventListener('click', function () {
        setProjectPanelTab(button.dataset.projectTab);
      });
    });
    $('#projectManageList').addEventListener('click', onProjectListClick);
    $('#projectManageList').addEventListener('change', renameProject);
    $('#projectForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const name = $('#projectName').value.trim();
      if (!name) {
        return;
      }
      state.projects.push({
        id: uid(),
        name: name,
        color: selectedProjectColor
      });
      $('#projectName').value = '';
      save();
      renderAll();
      showToast(t('projectAdded'));
    });
    $('#timelineProject').addEventListener('change', function () {
      timelineProjectId = this.value;
      renderProjectTimeline();
    });
    $('#projectTimeline').addEventListener('click', function (event) {
      const item = event.target.closest('.timeline-item');
      if (!item) {
        return;
      }
      const parts = item.dataset.iso.split('-').map(Number);
      currentDate = new Date(parts[0], parts[1] - 1, parts[2]);
      setView('day');
      renderAll();
    });
    $('#calendarGrid').addEventListener('click', function (event) {
      const cell = event.target.closest('button[data-iso]');
      if (!cell) {
        return;
      }
      const parts = cell.dataset.iso.split('-').map(Number);
      currentDate = new Date(parts[0], parts[1] - 1, parts[2]);
      setView('day');
      renderAll();
    });
    $('#calPrevMonth').addEventListener('click', function () {
      calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
      renderCalendar();
    });
    $('#calNextMonth').addEventListener('click', function () {
      calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
      renderCalendar();
    });
    $('#projectColors').innerHTML = COLORS.map(function (color) {
      return '<button type="button" class="color-swatch' + (color === selectedProjectColor ? ' active' : '') + '" style="background:' + color + '" data-color="' + color + '" aria-label="' + t('selectColor') + '"></button>';
    }).join('');
    $('#projectColors').addEventListener('click', function (event) {
      const button = event.target.closest('button');
      if (!button) {
        return;
      }
      selectedProjectColor = button.dataset.color;
      $$('#projectColors button').forEach(function (item) {
        item.classList.toggle('active', item === button);
      });
    });

    $$('.modal-close').forEach(function (button) {
      button.addEventListener('click', function () {
        closeModal(button.dataset.close);
      });
    });
    $$('.modal-backdrop').forEach(function (backdrop) {
      backdrop.addEventListener('click', function (event) {
        if (event.target === backdrop) {
          closeModal(backdrop.id);
        }
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        $$('.modal-backdrop').forEach(function (backdrop) {
          backdrop.hidden = true;
        });
        editingTaskId = null;
        editingMemoId = null;
        editingMoodLogId = null;
      }
    });

    $('#prevMonth').addEventListener('click', function () {
      currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
      renderMonth();
    });
    $('#nextMonth').addEventListener('click', function () {
      currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
      renderMonth();
    });

    renderAll();
    setView('calendar');
  }

  init();
  initRemoteSync();
})();
