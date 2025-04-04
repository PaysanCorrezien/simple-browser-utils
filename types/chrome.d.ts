declare namespace chrome {
  namespace storage {
    interface StorageArea {
      get(keys: string | string[] | null, callback: (items: { [key: string]: any }) => void): void;
      set(items: { [key: string]: any }, callback?: () => void): void;
    }
    const sync: StorageArea;
  }

  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
    }
    function update(tabId: number, updateProperties: { url: string }): void;
    const onCreated: {
      addListener(callback: (tab: Tab) => void): void;
    };
  }
} 