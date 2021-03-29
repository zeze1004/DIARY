export async function setToStorage(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({[key]: value}, function() {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
        reject();
      }
      resolve();
    });
  });
}

export async function getFromStorage(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, function (result) {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
        reject();
      }
      resolve(result[key]);
    });
  });
}
