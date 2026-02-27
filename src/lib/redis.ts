import type { RedisClientType } from "redis";
import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

let client: RedisClientType | null = null;
let connecting: Promise<void> | null = null;

function getOrCreateClient(): RedisClientType {
  if (!redisUrl) {
    throw new Error("REDIS_URL environment variable is not set");
  }

  if (!client) {
    client = createClient({ url: redisUrl });
    client.on("error", (err: unknown) => {
      // eslint-disable-next-line no-console
      console.error("[Redis] Client error", err);
    });
  }

  return client;
}

async function getConnectedClient(): Promise<RedisClientType> {
  const redis = getOrCreateClient();

  if (redis.isOpen) {
    return redis;
  }

  if (!connecting) {
    connecting = (redis.connect() as unknown as Promise<void>).catch(
      (err: unknown) => {
      connecting = null;
      throw err;
    }
    );
  }

  await connecting;
  return redis;
}

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const redis = await getConnectedClient();
    const raw = await redis.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[Redis] Error reading cache", err);
    return null;
  }
}

export async function setCache(
  key: string,
  value: unknown,
  ttlSeconds?: number
): Promise<void> {
  try {
    const redis = await getConnectedClient();
    const payload = JSON.stringify(value);

    if (ttlSeconds && ttlSeconds > 0) {
      await redis.set(key, payload, { EX: ttlSeconds });
    } else {
      await redis.set(key, payload);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[Redis] Error writing cache", err);
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    const redis = await getConnectedClient();
    await redis.del(key);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[Redis] Error deleting cache key", err);
  }
}

