/**
 * Lightweight job queue implementation. Jobs are executed sequentially to
 * avoid overwhelming downstream services (e.g. email providers). Each job
 * is a function returning a Promise. When a job is enqueued it will be
 * processed as soon as the queue is idle. Failed jobs are logged and
 * discarded; in a production system you'd add retry logic.
 */

export type Job = () => Promise<void>;

const queue: Job[] = [];
let processing = false;

/**
 * Add a job to the queue.
 */
export function enqueue(job: Job): void {
  queue.push(job);
  void processQueue();
}

async function processQueue(): Promise<void> {
  if (processing) return;
  processing = true;
  while (queue.length > 0) {
    const job = queue.shift()!;
    try {
      await job();
    } catch (err) {
      console.error('Job failed', err);
    }
  }
  processing = false;
}
