/**
 * TypeScript Definitions for Notiva
 */

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastIcon = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'danger' | 'question';

export interface ToastAction {
  label: string;
  onClick: (e: MouseEvent) => void;
  dismiss?: boolean;
}

export interface ToastCancel {
  label?: string;
  onClick?: (e: MouseEvent) => void;
}

export interface ToastOptions {
  id?: string;
  title?: string;
  text?: string;
  description?: string;
  icon?: ToastIcon;
  iconColor?: string;
  customIcon?: string;
  position?: ToastPosition;
  duration?: number;
  timer?: number;
  backdrop?: boolean | string;
  backdropBlur?: boolean;
  background?: string;
  color?: string;
  borderColor?: string;
  actionColor?: string;
  progressBarColor?: string;
  progressBar?: boolean;
  closeButton?: boolean;
  draggable?: boolean;
  action?: ToastAction;
  cancel?: ToastCancel;
}

export interface ConfirmOptions extends ToastOptions {
  /** Raw HTML string rendered in the modal body. ⚠️ Only use trusted (developer-controlled) content. For user content, use Notiva.escape() first. */
  html?: string;
  /** Callback receiving the content HTMLElement for full DOM control (modals only). */
  render?: (el: HTMLElement) => void;
  confirmButtonText?: string;
  confirmText?: string;
  cancelButtonText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  backdropColor?: string;
  allowOutsideClick?: boolean;
  /** Show or hide the confirm button. Default: true */
  showConfirmButton?: boolean;
  /** Show or hide the cancel button. Default: true for confirm, false for alert */
  showCancelButton?: boolean;
  /** Auto-close the modal after N milliseconds and resolve with true. */
  timer?: number;
  /** Show a shrinking progress bar inside the modal when timer is set. */
  timerProgressBar?: boolean;
  /** Custom max-width for the modal popup. e.g. '700px' or 600 */
  width?: string | number;
  /** Add custom CSS class names to modal sub-elements. */
  customClass?: {
    popup?: string;
    confirmButton?: string;
    cancelButton?: string;
    title?: string;
    htmlContainer?: string;
  };
  /** Swap the position of confirm and cancel buttons. Default: false */
  reverseButtons?: boolean;
  /** Allow closing the modal with the Escape key. Default: true */
  allowEscapeKey?: boolean;
}

export interface PromptOptions extends ConfirmOptions {
  inputType?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  required?: boolean;
}

export interface PromiseOptions<T> {
  position?: ToastPosition;
  loading: string | Partial<ToastOptions>;
  success: string | ((result: T) => string | Partial<ToastOptions>);
  error: string | ((err: any) => string | Partial<ToastOptions>);
}

export interface GlobalConfig {
  position?: ToastPosition;
  duration?: number;
  theme?: 'light' | 'dark' | 'system' | 'auto';
  backdrop?: boolean;
  backdropBlur?: boolean;
  closeButton?: boolean;
  progressBar?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  colors?: {
    primary?: string;
    primaryHover?: string;
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
    background?: string;
    text?: string;
    border?: string;
  };
}

export interface NotivaInstance {
  (title: string, textOrOptions?: string | ToastOptions, options?: ToastOptions): string;
  fire(options: ToastOptions): string;
  fire(title: string, text?: string, icon?: ToastIcon): string;
  success(title: string, textOrOptions?: string | ToastOptions, options?: ToastOptions): string;
  error(title: string, textOrOptions?: string | ToastOptions, options?: ToastOptions): string;
  warning(title: string, textOrOptions?: string | ToastOptions, options?: ToastOptions): string;
  info(title: string, textOrOptions?: string | ToastOptions, options?: ToastOptions): string;
  loading(title: string, textOrOptions?: string | ToastOptions, options?: ToastOptions): string;
  promise<T>(promise: Promise<T>, options: PromiseOptions<T>): Promise<T>;
  confirm(options?: ConfirmOptions): Promise<boolean>;
  confirm(title: string, text?: string, icon?: ToastIcon): Promise<boolean>;
  prompt(options?: PromptOptions): Promise<string | null>;
  prompt(title: string, text?: string): Promise<string | null>;
  alert(options?: ConfirmOptions | string): Promise<boolean>;
  config(options?: Partial<GlobalConfig>): GlobalConfig;
  setTheme(theme: 'light' | 'dark' | 'system' | 'auto'): void;
  escape(str: string): string;
  dismiss(id: string): void;
  dismissAll(): void;
}

export declare const toast: NotivaInstance;
export declare const Notiva: NotivaInstance;
export default toast;
