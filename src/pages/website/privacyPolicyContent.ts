/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import type { WebsiteLocale } from './websiteContent';

export interface PrivacyPolicySection {
  id: string;
  title: string;
  paragraphs: readonly string[];
}

export interface PrivacyPolicyContent {
  brandName: string;
  title: string;
  updatedLabel: string;
  updatedDate: string;
  homeLabel: string;
  localeToggleLabel: string;
  contactEmail: string;
  limitedUseTitle: string;
  limitedUseStatement: string;
  sections: readonly PrivacyPolicySection[];
}

const contactEmail = 'soperfang@gmail.com';
const limitedUseStatement = 'The use of information received from Google APIs will adhere to the Chrome Web Store User Data Policy, including the Limited Use requirements.';

export const privacyPolicyContentByLocale: Readonly<Record<WebsiteLocale, PrivacyPolicyContent>> = {
  en: {
    brandName: 'openSider',
    title: 'Privacy Policy',
    updatedLabel: 'Last updated',
    updatedDate: 'July 19, 2026',
    homeLabel: 'Back to home',
    localeToggleLabel: 'Choose language',
    contactEmail,
    limitedUseTitle: 'Chrome Web Store Limited Use',
    limitedUseStatement,
    sections: [
      {
        id: 'scope',
        title: '1. Scope',
        paragraphs: [
          'This Privacy Policy explains how openSider handles user data when you use the openSider browser extension and this website. It applies to data handled by the extension, not to the independent privacy practices of websites or AI service providers that you choose to use.',
        ],
      },
      {
        id: 'data',
        title: '2. Data We Handle',
        paragraphs: [
          'When you actively use an AI feature, openSider may process the prompt you enter, text you select, or page content you choose to send for the requested feature. These data types can include website content and user-generated content.',
          'Your language preference, selected AI provider settings, and API key are kept in your local browser storage. openSider does not provide an account system for this extension.',
        ],
      },
      {
        id: 'purpose',
        title: '3. How We Use Data',
        paragraphs: [
          'openSider uses the data you choose to provide only to deliver the user-facing feature you request, such as answering a question, translating selected content, or generating a summary. We do not use this data to build advertising profiles or for personalized, retargeted, or interest-based advertising.',
          'The extension processes data only when needed for its disclosed browser-assistant purpose and related operation, security, and reliability needs.',
        ],
      },
      {
        id: 'sharing',
        title: '4. Third-Party Sharing',
        paragraphs: [
          'When you choose an AI provider and start a request, the relevant prompt, selected text, or page content is transmitted to that provider so it can generate the result you requested. The provider handles that request under its own privacy policy and terms.',
          'We do not sell user data. We do not share user data with advertising networks. Apart from the AI provider you select, data may be disclosed only when required by applicable law or necessary to protect the security of openSider or its users.',
        ],
      },
      {
        id: 'storage-security',
        title: '5. Local Storage and Security',
        paragraphs: [
          'Your API key is stored only in your local browser. You can remove it at any time through the extension settings or by clearing the extension’s browser storage.',
          'Any transmission to a selected AI provider is made over the secure connection supported by that provider. No method of transmission or storage is completely secure, so please protect your device and API key.',
        ],
      },
      {
        id: 'choices',
        title: '6. Your Choices',
        paragraphs: [
          'You decide whether to invoke an AI feature and what content to send. You can change your provider configuration, delete local extension data, or uninstall openSider at any time.',
          `For questions or privacy requests, contact us at ${contactEmail}. Requests concerning data retained by a selected AI provider may also need to be directed to that provider.`,
        ],
      },
      {
        id: 'children',
        title: '7. Children’s Privacy',
        paragraphs: [
          'openSider is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information through openSider, contact us so that we can review the request.',
        ],
      },
      {
        id: 'changes',
        title: '8. Changes to This Policy',
        paragraphs: [
          'We may update this policy when the extension’s data practices, features, or legal requirements change. We will post the revised policy on this page and update the date above. Material changes will be reflected in the extension and applicable Chrome Web Store disclosures before they take effect.',
        ],
      },
      {
        id: 'contact',
        title: '9. Contact Us',
        paragraphs: [
          `If you have questions, concerns, or requests about this Privacy Policy, email ${contactEmail}.`,
        ],
      },
    ],
  },
  'zh-CN': {
    brandName: 'openSider',
    title: '隐私政策',
    updatedLabel: '最后更新',
    updatedDate: '2026 年 7 月 19 日',
    homeLabel: '返回首页',
    localeToggleLabel: '选择语言',
    contactEmail,
    limitedUseTitle: 'Chrome Web Store 有限使用声明',
    limitedUseStatement,
    sections: [
      {
        id: 'scope',
        title: '1. 适用范围',
        paragraphs: [
          '本隐私政策说明您使用 openSider 浏览器扩展程序及本网站时，openSider 如何处理用户数据。本政策适用于扩展程序处理的数据；对于您自行选择使用的网站或 AI 服务提供商，其独立的隐私处理规则不适用本政策。',
        ],
      },
      {
        id: 'data',
        title: '2. 我们处理的数据',
        paragraphs: [
          '当您主动使用 AI 功能时，openSider 可能处理您输入的提示词、选中的文本，或您选择发送以完成该功能的网页内容。这些数据可能包括网页内容和用户生成内容。',
          '您的语言偏好、所选 AI 服务提供商配置和 API Key 均保存在本地浏览器存储中。openSider 不为该扩展程序提供账号系统。',
        ],
      },
      {
        id: 'purpose',
        title: '3. 数据使用方式',
        paragraphs: [
          'openSider 仅将您主动提供的数据用于实现您请求的面向用户的功能，例如回答问题、翻译选中内容或生成摘要。我们不会使用这些数据建立广告画像，也不会用于个性化、再营销或基于兴趣的广告。',
          '扩展程序仅在实现已披露的浏览器 AI 助手目的及相关的运行、安全和可靠性需求所必需时处理数据。',
        ],
      },
      {
        id: 'sharing',
        title: '4. 与第三方共享',
        paragraphs: [
          '当您选择 AI 服务提供商并发起请求时，相关提示词、选中文本或网页内容会被传输给该服务提供商，以生成您请求的结果。该服务提供商将依照其自己的隐私政策和服务条款处理该请求。',
          '我们不出售用户数据，也不会与广告网络共享用户数据。除您选择的 AI 服务提供商外，仅在适用法律要求或为保护 openSider 及其用户安全所必需时披露数据。',
        ],
      },
      {
        id: 'storage-security',
        title: '5. 本地存储与安全',
        paragraphs: [
          '您的 API Key 仅保存在本地浏览器中。您可以随时通过扩展程序设置删除它，或清除扩展程序的浏览器存储。',
          '向所选 AI 服务提供商传输数据时，将使用该服务提供商支持的安全连接。没有任何传输或存储方式能够保证绝对安全，请妥善保护您的设备和 API Key。',
        ],
      },
      {
        id: 'choices',
        title: '6. 您的选择',
        paragraphs: [
          '是否调用 AI 功能以及发送何种内容均由您决定。您可以随时更改服务提供商配置、删除扩展程序本地数据或卸载 openSider。',
          `如有隐私问题或请求，请联系 ${contactEmail}。如请求涉及所选 AI 服务提供商保留的数据，您可能还需要直接向该服务提供商提出。`,
        ],
      },
      {
        id: 'children',
        title: '7. 儿童隐私',
        paragraphs: [
          'openSider 不面向 13 周岁以下儿童，我们也不会明知收集 13 周岁以下儿童的个人信息。如您认为儿童通过 openSider 提供了个人信息，请联系我们，以便我们核查该请求。',
        ],
      },
      {
        id: 'changes',
        title: '8. 本政策的更新',
        paragraphs: [
          '当扩展程序的数据处理方式、功能或法律要求发生变化时，我们可能更新本政策。修订后的政策将发布于本页面，并更新上述日期。重大变更生效前，会同步反映在扩展程序和适用的 Chrome Web Store 披露中。',
        ],
      },
      {
        id: 'contact',
        title: '9. 联系我们',
        paragraphs: [
          `如您对本隐私政策有任何问题、疑虑或请求，请发送邮件至 ${contactEmail}。`,
        ],
      },
    ],
  },
};
