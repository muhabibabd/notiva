/**
 * Notiva ESM v1.0.1
 * Modern Toast & Confirm Modal (ES Module build)
 */

// Default Global Configuration
var defaults = {
  position: 'top-right',
  duration: 4000,
  theme: 'auto', // 'light' | 'dark' | 'auto'
  backdrop: false,
  backdropBlur: true,
  closeButton: true,
  progressBar: true,
  pauseOnHover: true,
  draggable: true,
  colors: {
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    background: '',
    text: '',
    border: '',
  },
};

var config = Object.assign({}, defaults);

var ICONS = {
  success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
  error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
  danger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
  loading: '<svg class="ss-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>',
  question: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
};

var POSITIONS = [
  'top-left', 'top-center', 'top-right',
  'center-left', 'center', 'center-right',
  'bottom-left', 'bottom-center', 'bottom-right'
];

var containers = {};
var toastsByPosition = {};
var activeBackdrops = 0;
var globalBackdropEl = null;

POSITIONS.forEach(function (pos) {
  toastsByPosition[pos] = [];
});

function getContainer(position) {
  var pos = POSITIONS.indexOf(position) !== -1 ? position : config.position;
  if (!containers[pos] || (typeof document !== 'undefined' && !document.body.contains(containers[pos]))) {
    if (typeof document === 'undefined') return null;
    var container = document.createElement('div');
    container.className = 'ss-container ss-pos-' + pos;
    container.setAttribute('data-position', pos);

    var collapseTimer = null;

    container.addEventListener('mouseenter', function () {
      if (collapseTimer) {
        clearTimeout(collapseTimer);
        collapseTimer = null;
      }
      container.setAttribute('data-expanded', 'true');
      updateStack(pos);
    });

    container.addEventListener('mouseleave', function () {
      if (collapseTimer) clearTimeout(collapseTimer);
      collapseTimer = setTimeout(function () {
        container.removeAttribute('data-expanded');
        updateStack(pos);
        collapseTimer = null;
      }, 180);
    });

    document.body.appendChild(container);
    containers[pos] = container;
  }
  return containers[pos];
}

function showBackdrop(isBlur, customColor) {
  if (typeof document === 'undefined') return;
  if (!globalBackdropEl || !document.body.contains(globalBackdropEl)) {
    globalBackdropEl = document.createElement('div');
    globalBackdropEl.className = 'ss-backdrop';
    document.body.appendChild(globalBackdropEl);
  }
  activeBackdrops++;
  if (isBlur) globalBackdropEl.classList.add('ss-backdrop-blur');
  if (customColor) globalBackdropEl.style.backgroundColor = customColor;
  void globalBackdropEl.offsetWidth;
  globalBackdropEl.classList.add('ss-visible');
}

function hideBackdrop() {
  activeBackdrops = Math.max(0, activeBackdrops - 1);
  if (activeBackdrops === 0 && globalBackdropEl) {
    globalBackdropEl.classList.remove('ss-visible');
    var _elToRemove = globalBackdropEl;
    setTimeout(function () {
      if (activeBackdrops === 0 && _elToRemove && _elToRemove.parentNode) {
        _elToRemove.parentNode.removeChild(_elToRemove);
      }
      if (activeBackdrops === 0) {
        globalBackdropEl = null;
      }
    }, 300);
  }
}

function updateStack(pos) {
  var list = toastsByPosition[pos];
  if (!list) return;
  var isExpanded = containers[pos] && containers[pos].getAttribute('data-expanded') === 'true';
  var isBottom = pos.indexOf('bottom') !== -1;
  var accumulatedHeight = 0;

  for (var i = 0; i < list.length; i++) {
    var toastObj = list[i];
    var el = toastObj.element;
    el.setAttribute('data-index', i);
    el.style.setProperty('--index', i);

    var height = el.getBoundingClientRect().height || 54;

    if (isExpanded) {
      var offset = accumulatedHeight;
      var yVal = isBottom ? -offset : offset;
      el.style.setProperty('--expanded-offset', yVal + 'px');
      accumulatedHeight += height + (config.gap || 10);
    } else {
      var offsetStep = 12;
      var yVal = isBottom ? -(i * offsetStep) : (i * offsetStep);
      if (i === 1) el.style.setProperty('--calc-offset-1', yVal + 'px');
      if (i === 2) el.style.setProperty('--calc-offset-2', yVal + 'px');
      if (i === 3) el.style.setProperty('--calc-offset-3', yVal + 'px');
    }
  }
}

var idCounter = 0;
function uid() {
  return 'ss_' + (++idCounter) + '_' + Date.now();
}

function createToast(options) {
  if (typeof document === 'undefined') return null;
  var id = options.id || uid();
  var pos = POSITIONS.indexOf(options.position) !== -1 ? options.position : config.position;
  var container = getContainer(pos);

  var toastEl = document.createElement('div');
  toastEl.className = 'ss-toast';
  toastEl.id = id;

  if (options.background) toastEl.style.setProperty('--ss-bg', options.background);
  if (options.color) toastEl.style.setProperty('--ss-text', options.color);
  if (options.borderColor) toastEl.style.setProperty('--ss-border', options.borderColor);

  var iconHtml = '';
  var iconName = options.icon;
  if (iconName && ICONS[iconName]) {
    var iconColor = options.iconColor;
    if (!iconColor) {
      if (iconName === 'success') iconColor = config.colors.success;
      else if (iconName === 'error' || iconName === 'danger') iconColor = config.colors.error;
      else if (iconName === 'warning') iconColor = config.colors.warning;
      else if (iconName === 'info') iconColor = config.colors.info;
      else if (iconName === 'loading') iconColor = config.colors.primary;
    }
    var styleAttr = iconColor ? 'style="color: ' + iconColor + '"' : '';
    iconHtml = '<div class="ss-toast-icon" ' + styleAttr + '>' + ICONS[iconName] + '</div>';
  } else if (options.customIcon) {
    iconHtml = '<div class="ss-toast-icon">' + options.customIcon + '</div>';
  }

  var titleHtml = options.title ? '<div class="ss-toast-title">' + options.title + '</div>' : '';
  var textHtml = options.text || options.description ? '<div class="ss-toast-desc">' + (options.text || options.description) + '</div>' : '';

  var actionsHtml = '';
  if (options.action || options.cancel) {
    actionsHtml += '<div class="ss-toast-actions">';
    if (options.action) actionsHtml += '<button type="button" class="ss-btn ss-btn-primary ss-action-btn">' + (options.action.label || 'Action') + '</button>';
    if (options.cancel) actionsHtml += '<button type="button" class="ss-btn ss-btn-cancel ss-cancel-btn">' + (options.cancel.label || 'Batal') + '</button>';
    actionsHtml += '</div>';
  }

  var closeHtml = (options.closeButton !== false && config.closeButton)
    ? '<button type="button" class="ss-toast-close" aria-label="Close">' + ICONS.close + '</button>'
    : '';

  var progressHtml = '';
  var duration = typeof options.duration === 'number' ? options.duration : (typeof options.timer === 'number' ? options.timer : config.duration);
  if (duration > 0 && options.progressBar !== false && config.progressBar && iconName !== 'loading') {
    var barColor = options.progressBarColor || (iconName && config.colors[iconName]) || config.colors.primary;
    progressHtml = '<div class="ss-progress-bar" style="background-color: ' + barColor + '; animation-duration: ' + duration + 'ms;"></div>';
  }

  toastEl.innerHTML =
    '<div class="ss-toast-content">' +
      iconHtml +
      '<div class="ss-toast-body">' +
        titleHtml +
        textHtml +
        actionsHtml +
      '</div>' +
    '</div>' +
    closeHtml +
    progressHtml;

  if (options.actionColor) {
    var actBtn = toastEl.querySelector('.ss-action-btn');
    if (actBtn) actBtn.style.backgroundColor = options.actionColor;
  }

  var hasBackdrop = options.backdrop || false;
  var hasBackdropBlur = options.backdropBlur !== undefined ? options.backdropBlur : config.backdropBlur;
  if (hasBackdrop) {
    showBackdrop(hasBackdropBlur, typeof options.backdrop === 'string' ? options.backdrop : null);
  }

  var closeBtn = toastEl.querySelector('.ss-toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      dismiss(id);
    });
  }

  if (options.action && options.action.onClick) {
    var actBtnEl = toastEl.querySelector('.ss-action-btn');
    if (actBtnEl) {
      actBtnEl.addEventListener('click', function (e) {
        e.stopPropagation();
        options.action.onClick(e);
        if (options.action.dismiss !== false) dismiss(id);
      });
    }
  }

  if (options.cancel && options.cancel.onClick) {
    var canBtnEl = toastEl.querySelector('.ss-cancel-btn');
    if (canBtnEl) {
      canBtnEl.addEventListener('click', function (e) {
        e.stopPropagation();
        options.cancel.onClick(e);
        dismiss(id);
      });
    }
  }

  if (options.draggable !== false && config.draggable) {
    enableDrag(toastEl, id, pos);
  }

  var timerId = null;
  var remainingTime = duration;
  var startTime = Date.now();

  function startTimer() {
    if (duration > 0) {
      startTime = Date.now();
      timerId = setTimeout(function () {
        dismiss(id);
      }, remainingTime);
    }
  }

  function pauseTimer() {
    if (timerId) {
      clearTimeout(timerId);
      remainingTime -= (Date.now() - startTime);
    }
  }

  if (config.pauseOnHover && duration > 0) {
    toastEl.addEventListener('mouseenter', pauseTimer);
    toastEl.addEventListener('mouseleave', startTimer);
  }

  startTimer();

  var toastRecord = {
    id: id,
    position: pos,
    element: toastEl,
    hasBackdrop: hasBackdrop,
    timerId: timerId,
    options: options,
  };

  toastsByPosition[pos].unshift(toastRecord);
  container.appendChild(toastEl);

  requestAnimationFrame(function () {
    updateStack(pos);
  });

  return id;
}

function enableDrag(el, id, pos) {
  var startX = 0, startY = 0, currentX = 0, currentY = 0, isDragging = false;

  function onPointerDown(e) {
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a')) return;
    isDragging = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    el.classList.add('ss-dragging');
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    var clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    var clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    currentX = clientX - startX;
    currentY = clientY - startY;

    el.style.setProperty('--drag-x', currentX + 'px');
    el.style.setProperty('--drag-y', (currentY * 0.15) + 'px');
    var opacity = Math.max(0.15, 1 - Math.abs(currentX) / 220);
    el.style.opacity = opacity;
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    el.classList.remove('ss-dragging');
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);

    // If dragged further than 60px, smoothly dismiss horizontally without bouncing
    if (Math.abs(currentX) > 60) {
      var direction = currentX > 0 ? 400 : -400;
      el.style.transition = 'transform 0.22s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.2s ease';
      el.style.setProperty('--drag-x', direction + 'px');
      el.style.opacity = '0';
      dismiss(id, true);
    } else {
      // Spring back smoothly
      el.style.transition = 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.1), opacity 0.2s ease';
      el.style.setProperty('--drag-x', '0px');
      el.style.setProperty('--drag-y', '0px');
      el.style.opacity = '';
    }
  }

  el.addEventListener('pointerdown', onPointerDown);
}

function dismiss(id, isSwiped) {
  POSITIONS.forEach(function (pos) {
    var list = toastsByPosition[pos];
    if (!list) return;
    var index = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      var toastObj = list[index];
      var el = toastObj.element;

      if (toastObj.timerId) clearTimeout(toastObj.timerId);
      if (toastObj.hasBackdrop) hideBackdrop();

      // If not swiped horizontally, animate out via vertical fade
      if (!isSwiped) {
        el.style.transition = 'transform 0.22s cubic-bezier(0.4, 0, 1, 1), opacity 0.2s ease';
        el.style.opacity = '0';
        el.style.setProperty('--scale', '0.85');
        el.style.setProperty('--drag-y', '10px');
      }

      // Immediately update stack so other cards in the list smoothly slide into place
      list.splice(index, 1);
      updateStack(pos);

      // Remove from DOM when animation completes
      setTimeout(function () {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }, 220);
    }
  });
}

function dismissAll() {
  POSITIONS.forEach(function (pos) {
    var list = toastsByPosition[pos];
    if (!list) return;
    var copy = list.slice();
    copy.forEach(function (t) {
      dismiss(t.id);
    });
  });
}

function parseArgs(arg1, arg2, arg3, defaultIcon) {
  var opts = {};
  if (typeof arg1 === 'object' && arg1 !== null) {
    opts = Object.assign({}, arg1);
  } else if (typeof arg1 === 'string') {
    if (typeof arg2 === 'string') {
      opts.title = arg1;
      opts.text = arg2;
      if (typeof arg3 === 'object' && arg3 !== null) Object.assign(opts, arg3);
    } else if (typeof arg2 === 'object' && arg2 !== null) {
      opts.title = arg1;
      Object.assign(opts, arg2);
    } else {
      opts.title = arg1;
    }
  }
  if (defaultIcon && !opts.icon) opts.icon = defaultIcon;
  return opts;
}

export function toast(arg1, arg2, arg3) {
  return createToast(parseArgs(arg1, arg2, arg3));
}

toast.fire = function (arg1, arg2, arg3) {
  return createToast(parseArgs(arg1, arg2, arg3));
};

toast.success = function (arg1, arg2, arg3) {
  return createToast(parseArgs(arg1, arg2, arg3, 'success'));
};

toast.error = function (arg1, arg2, arg3) {
  return createToast(parseArgs(arg1, arg2, arg3, 'error'));
};

toast.warning = function (arg1, arg2, arg3) {
  return createToast(parseArgs(arg1, arg2, arg3, 'warning'));
};

toast.info = function (arg1, arg2, arg3) {
  return createToast(parseArgs(arg1, arg2, arg3, 'info'));
};

toast.loading = function (arg1, arg2, arg3) {
  var opts = parseArgs(arg1, arg2, arg3, 'loading');
  if (opts.duration === undefined && opts.timer === undefined) opts.duration = 0;
  return createToast(opts);
};

toast.promise = function (promise, options) {
  var loadingOpts = typeof options.loading === 'string' ? { title: options.loading } : (options.loading || { title: 'Loading...' });
  var toastId = toast.loading(Object.assign({ position: options.position }, loadingOpts));

  return promise
    .then(function (result) {
      dismiss(toastId);
      var successOpts = typeof options.success === 'function' ? options.success(result) : options.success;
      if (typeof successOpts === 'string') successOpts = { title: successOpts };
      toast.success(Object.assign({ position: options.position }, successOpts));
      return result;
    })
    .catch(function (error) {
      dismiss(toastId);
      var errorOpts = typeof options.error === 'function' ? options.error(error) : options.error;
      if (typeof errorOpts === 'string') errorOpts = { title: errorOpts || 'An error occurred' };
      toast.error(Object.assign({ position: options.position }, errorOpts));
      throw error;
    });
};

toast.confirm = function (arg1, arg2, arg3) {
  var options = parseArgs(arg1, arg2, arg3, 'warning');
  var title = options.title || 'Apakah Anda yakin?';
  var text = options.text || options.description || '';
  var icon = options.icon || 'warning';
  var pos = options.position || 'center';
  var confirmText = options.confirmButtonText || options.confirmText || 'Ya, Lanjutkan';
  var cancelText = options.cancelButtonText || options.cancelText || 'Batal';
  var confirmColor = options.confirmButtonColor || (icon === 'danger' || icon === 'error' ? config.colors.error : config.colors.primary);
  var cancelColor = options.cancelButtonColor || '';
  var isBackdropBlur = options.backdropBlur !== undefined ? options.backdropBlur : true;
  var backdropColor = options.backdropColor || null;

  return new Promise(function (resolve) {
    showBackdrop(isBackdropBlur, backdropColor);

    var overlay = document.createElement('div');
    overlay.className = 'ss-modal-overlay ss-pos-' + pos;

    var iconHtml = '';
    if (ICONS[icon]) {
      var iconColor = options.iconColor || (config.colors[icon] || (icon === 'danger' ? config.colors.error : config.colors.warning));
      iconHtml =
        '<div class="ss-modal-icon-wrapper" style="background-color: ' + iconColor + '18; color: ' + iconColor + '">' +
          ICONS[icon] +
        '</div>';
    }

    var modal = document.createElement('div');
    modal.className = 'ss-modal';
    if (options.background) modal.style.backgroundColor = options.background;
    if (options.color) modal.style.color = options.color;
    if (options.borderColor) modal.style.borderColor = options.borderColor;

    modal.innerHTML =
      iconHtml +
      '<div class="ss-modal-title">' + title + '</div>' +
      (text ? '<div class="ss-modal-text">' + text + '</div>' : '') +
      '<div class="ss-modal-buttons">' +
        (cancelText ? '<button type="button" class="ss-modal-btn ss-modal-btn-cancel ss-btn-modal-cancel">' + cancelText + '</button>' : '') +
        '<button type="button" class="ss-modal-btn ss-modal-btn-confirm ss-btn-modal-confirm" style="background-color: ' + confirmColor + '">' + confirmText + '</button>' +
      '</div>';

    if (cancelColor) {
      var cBtn = modal.querySelector('.ss-btn-modal-cancel');
      if (cBtn) cBtn.style.backgroundColor = cancelColor;
    }

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
      modal.classList.add('ss-modal-visible');
    });

    var isClosed = false;
    function cleanup(result) {
      if (isClosed) return;
      isClosed = true;
      window.removeEventListener('keydown', onKeyDown);
      modal.classList.remove('ss-modal-visible');
      overlay.style.pointerEvents = 'none';
      hideBackdrop();
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 300);
      resolve(result);
    }

    var confirmBtn = modal.querySelector('.ss-btn-modal-confirm');
    var cancelBtn = modal.querySelector('.ss-btn-modal-cancel');

    if (confirmBtn) {
      confirmBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        cleanup(true);
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        cleanup(false);
      });
    }

    if (options.allowOutsideClick !== false) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) cleanup(false);
      });
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') cleanup(false);
    }
    window.addEventListener('keydown', onKeyDown);
  });
};

toast.prompt = function (arg1, arg2, arg3) {
  var options = parseArgs(arg1, arg2, arg3, 'question');
  var title = options.title || 'Masukkan Data';
  var text = options.text || '';
  var inputType = options.inputType || 'text';
  var placeholder = options.placeholder || '';
  var defaultValue = options.value || '';
  var confirmText = options.confirmButtonText || 'Kirim';
  var cancelText = options.cancelButtonText || 'Batal';
  var required = options.required || false;
  var pos = options.position || 'center';
  var isBackdropBlur = options.backdropBlur !== undefined ? options.backdropBlur : true;

  return new Promise(function (resolve) {
    showBackdrop(isBackdropBlur, options.backdropColor);

    var overlay = document.createElement('div');
    overlay.className = 'ss-modal-overlay ss-pos-' + pos;

    var modal = document.createElement('div');
    modal.className = 'ss-modal';
    if (options.background) modal.style.backgroundColor = options.background;

    modal.innerHTML =
      '<div class="ss-modal-title">' + title + '</div>' +
      (text ? '<div class="ss-modal-text">' + text + '</div>' : '') +
      '<div class="ss-modal-input-wrap">' +
        '<input type="' + inputType + '" class="ss-modal-input" placeholder="' + placeholder + '" value="' + defaultValue + '" />' +
      '</div>' +
      '<div class="ss-modal-buttons">' +
        '<button type="button" class="ss-modal-btn ss-modal-btn-cancel ss-btn-modal-cancel">' + cancelText + '</button>' +
        '<button type="button" class="ss-modal-btn ss-modal-btn-confirm ss-btn-modal-confirm">' + confirmText + '</button>' +
      '</div>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    var inputEl = modal.querySelector('.ss-modal-input');
    requestAnimationFrame(function () {
      modal.classList.add('ss-modal-visible');
      if (inputEl) inputEl.focus();
    });

    var isClosed = false;
    function cleanup(val) {
      if (isClosed) return;
      isClosed = true;
      modal.classList.remove('ss-modal-visible');
      overlay.style.pointerEvents = 'none';
      hideBackdrop();
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 300);
      resolve(val);
    }

    var confirmBtn = modal.querySelector('.ss-btn-modal-confirm');
    var cancelBtn = modal.querySelector('.ss-btn-modal-cancel');

    function handleConfirm(e) {
      if (e) e.stopPropagation();
      var val = inputEl.value.trim();
      if (required && !val) {
        inputEl.style.borderColor = config.colors.error;
        inputEl.focus();
        return;
      }
      cleanup(val);
    }

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      cleanup(null);
    });

    if (options.allowOutsideClick !== false) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) cleanup(null);
      });
    }

    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleConfirm();
      if (e.key === 'Escape') cleanup(null);
    });
  });
};

toast.alert = function (arg1, arg2, arg3) {
  var opts = parseArgs(arg1, arg2, arg3, 'info');
  opts.confirmButtonText = opts.confirmButtonText || 'OK';
  opts.cancelButtonText = '';
  return toast.confirm(opts);
};

toast.config = function (newConfig) {
  if (!newConfig) return config;
  if (newConfig.colors) {
    config.colors = Object.assign({}, config.colors, newConfig.colors);
    delete newConfig.colors;
  }
  config = Object.assign({}, config, newConfig);
  if (config.theme) toast.setTheme(config.theme);
  return config;
};

var systemMediaListener = null;
function handleSystemThemeChange(e) {
  if (config.theme === 'system' || config.theme === 'auto') {
    if (e.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

toast.setTheme = function (theme) {
  theme = theme || 'system';
  config.theme = theme;
  if (typeof document === 'undefined') return;

  if (theme === 'dark') {
    document.documentElement.setAttribute('data-ss-theme', 'dark');
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.setAttribute('data-ss-theme', 'light');
    document.documentElement.classList.remove('dark');
  } else if (theme === 'system' || theme === 'auto') {
    document.documentElement.removeAttribute('data-ss-theme');
    if (typeof window !== 'undefined' && window.matchMedia) {
      var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      if (!systemMediaListener) {
        systemMediaListener = window.matchMedia('(prefers-color-scheme: dark)');
        if (systemMediaListener.addEventListener) {
          systemMediaListener.addEventListener('change', handleSystemThemeChange);
        } else if (systemMediaListener.addListener) {
          systemMediaListener.addListener(handleSystemThemeChange);
        }
      }
    }
  }
};

toast.dismiss = dismiss;
toast.dismissAll = dismissAll;

export const Notiva = toast;
export default toast;
