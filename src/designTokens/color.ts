export enum TextColorToken {
  colorTextDefault = 'var(--color_text_default)',
  colorTextSubtle = 'var(--color_text_subtle)',
  colorTextNeutral = 'var(--color_text_neutral)',
  colorTextInverse = 'var(--color_text_inverse)',
  colorTextAccent = 'var(--color_text_accent)',
}

export enum BackgroundColorToken {
  colorBackgroundDefault = 'var(--color_background_default)',
  colorBackgroundSubtle = 'var(--color_background_subtle)',
  colorBackgroundSubtleFloating = 'var(--color_background_subtle-floating)',
  colorBackgroundAccent = 'var(--color_background_accent)',
  colorBackgroundAccentFloating = 'var(--color_background_accent-floating)',
  colorBackgroundSuccessFloating = 'var(--color_background_success-floating)',
  colorBackgroundErrorFloating = 'var(--color_background_error-floating)',
}

export enum BorderColorToken {
  colorBorderDefault = 'var(--color_border_default)',
  colorBorderSubtle = 'var(--color_border_subtle)',
  colorBorderNeutral = 'var(--color_border_neutral)',
}

const ColorToken = { ...TextColorToken, ...BackgroundColorToken, ...BorderColorToken } as const

export default ColorToken
