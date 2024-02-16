export const getDeviceDetails = () => {
  const userAgent = navigator.userAgent;

  let device = 'Unknown';
  let osVersion = 'Unknown';
  let browser = 'Unknown';
  let browserVersion = 'Unknown';

  // Get device type
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    device = 'iPhone/iPad/iPod';
  } else if (/Android/i.test(userAgent)) {
    device = 'Android';
  } else if (/Windows Phone/i.test(userAgent)) {
    device = 'Windows Phone';
  } else if (/Windows NT/i.test(userAgent)) {
    device = 'Windows PC';
  } else if (/Macintosh/i.test(userAgent)) {
    device = 'Macintosh';
  } else if (/Linux/i.test(userAgent)) {
    device = 'Linux';
  }

  // Get OS version
  if (/iPhone OS ([^\s;]+)/.test(userAgent)) {
    osVersion = userAgent.match(/iPhone OS ([^\s;]+)/)?.[1] ?? 'Unknown';
  } else if (/Android ([^\s;]+)/.test(userAgent)) {
    osVersion = userAgent.match(/Android ([^\s;]+)/)?.[1] ?? 'Unknown';
  } else if (/Windows NT ([^\s;]+)/.test(userAgent)) {
    osVersion = userAgent.match(/Windows NT ([^\s;]+)/)?.[1] ?? 'Unknown';
  }

  // Get browser name and version
  if (/Chrome/i.test(userAgent)) {
    browser = 'Chrome';
    browserVersion = userAgent.match(/Chrome\/([^\s]+)/)?.[1] ?? 'Unknown';
  } else if (/Firefox/i.test(userAgent)) {
    browser = 'Firefox';
    browserVersion = userAgent.match(/Firefox\/([^\s]+)/)?.[1] ?? 'Unknown';
  } else if (/Safari/i.test(userAgent)) {
    browser = 'Safari';
    browserVersion = userAgent.match(/Version\/([^\s]+)/)?.[1] ?? 'Unknown';
  } else if (/MSIE|Trident/i.test(userAgent)) {
    browser = 'Internet Explorer';
    browserVersion = userAgent.match(/(MSIE |rv:)([^\s]+)/)?.[2] ?? 'Unknown';
  } else if (/Edge/i.test(userAgent)) {
    browser = 'Microsoft Edge';
    browserVersion = userAgent.match(/Edge\/([^\s]+)/)?.[1] ?? 'Unknown';
  }

  return {
    device,
    osVersion,
    browser,
    browserVersion,
    userAgentString: userAgent,
  };
};
