import {DockerResource} from '../../../common/interface/docker-resource';

export interface ActionableDockerResource extends DockerResource {
  isRunning: boolean;
}

