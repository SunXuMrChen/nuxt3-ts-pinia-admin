enum CacheType {
  Local,
  Session,
}

class Cache {
  private storage: Storage | null = null;

  constructor(type: CacheType) {
    if (process.client) {
      this.storage =
        type === CacheType.Local ? window.localStorage : window.sessionStorage;
    }
  }

  setCache(key: string, value: any) {
    if (this.storage && value) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  getCache<T = any>(key: string): T | null {
    if (!this.storage) return null;
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeCache(key: string) {
    this.storage?.removeItem(key);
  }

  clear() {
    this.storage?.clear();
  }
}

// 确保只在客户端实例化
const localCache = process.client ? new Cache(CacheType.Local) : null;
const sessionCache = process.client ? new Cache(CacheType.Session) : null;

export { localCache, sessionCache };
