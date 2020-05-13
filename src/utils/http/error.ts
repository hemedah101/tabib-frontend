import { message } from 'antd';

message.config({
  top: 50,
  duration: 5,
  maxCount: 3,
});

export function handleError(msg: string) {
  // TODO internationalize error handling
  message.error(msg);
}
