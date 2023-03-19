import { BaseTask } from 'adonis5-scheduler/build'
import MeetingService from '../Controllers/Http/Meeting/MeetingService';

export default class Reminder extends BaseTask {
	public static get schedule() {
		return '*/10 * * * * *'
	}
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() {
        console.log('run task')
        const t = new MeetingService()
        t.getTodaysMeetingsService()
  	}
}
