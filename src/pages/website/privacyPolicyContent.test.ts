/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { describe, expect, it } from 'vitest';
import { privacyPolicyContentByLocale } from './privacyPolicyContent';

describe('隐私政策内容', () => {
  it('为两种语言提供 Chrome 审核所需的披露信息', () => {
    for (const content of Object.values(privacyPolicyContentByLocale)) {
      expect(content.contactEmail).toBe('soperfang@gmail.com');
      expect(content.limitedUseStatement).toContain('Chrome Web Store User Data Policy');
      expect(content.sections).toHaveLength(9);
      expect(content.sections.every((section) => section.title && section.paragraphs.length > 0)).toBe(true);
    }
  });
});
