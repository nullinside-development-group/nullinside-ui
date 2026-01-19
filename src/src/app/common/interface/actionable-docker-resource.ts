import {DockerResource} from './docker-resource';

export interface ActionableDockerResource extends DockerResource {
  isRunning: boolean;
}
