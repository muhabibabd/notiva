<?php

namespace Notiva;

/**
 * Toast Helper for Laravel & Native PHP
 * Makes it effortless to flash toast notifications from Controllers & Middlewares.
 */
class Toast
{
    protected const SESSION_KEY = '_sweet_notiva_flashes';

    /**
     * Flash a success toast
     */
    public static function success(string $title, ?string $text = null, array $options = []): void
    {
        self::flash(array_merge([
            'icon' => 'success',
            'title' => $title,
            'text' => $text,
        ], $options));
    }

    /**
     * Flash an error toast
     */
    public static function error(string $title, ?string $text = null, array $options = []): void
    {
        self::flash(array_merge([
            'icon' => 'error',
            'title' => $title,
            'text' => $text,
        ], $options));
    }

    /**
     * Flash a warning toast
     */
    public static function warning(string $title, ?string $text = null, array $options = []): void
    {
        self::flash(array_merge([
            'icon' => 'warning',
            'title' => $title,
            'text' => $text,
        ], $options));
    }

    /**
     * Flash an info toast
     */
    public static function info(string $title, ?string $text = null, array $options = []): void
    {
        self::flash(array_merge([
            'icon' => 'info',
            'title' => $title,
            'text' => $text,
        ], $options));
    }

    /**
     * Flash a generic / custom toast (Universal Object-style)
     */
    public static function fire(array $options): void
    {
        self::flash($options);
    }

    /**
     * Flash notification data into session
     */
    public static function flash(array $options): void
    {
        if (function_exists('session')) {
            $flashes = session()->get(self::SESSION_KEY, []);
            $flashes[] = $options;
            session()->flash(self::SESSION_KEY, $flashes);
        } else {
            if (session_status() === PHP_SESSION_NONE) {
                @session_start();
            }
            $_SESSION[self::SESSION_KEY][] = $options;
        }
    }

    /**
     * Render HTML/JS script tags for Blade or Native PHP templates
     */
    public static function render(): string
    {
        $flashes = [];

        if (function_exists('session')) {
            $flashes = session()->get(self::SESSION_KEY, []);
        } elseif (isset($_SESSION[self::SESSION_KEY])) {
            $flashes = $_SESSION[self::SESSION_KEY];
            unset($_SESSION[self::SESSION_KEY]);
        }

        if (empty($flashes)) {
            return '';
        }

        $json = json_encode($flashes, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);

        return <<<HTML
<script>
  window.__LARAVEL_TOAST__ = {$json};
</script>
HTML;
    }
}
