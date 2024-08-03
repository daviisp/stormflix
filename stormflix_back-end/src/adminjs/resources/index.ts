import { ResourceWithOptions } from "adminjs";
import { Category, Course, User, Episode } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceFeatures, courseResourceOptions } from "./course";
import { episodeResourceOptions, episodeRouserceFeatures } from "./episode";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Course,
    options: courseResourceOptions,
    features: courseResourceFeatures,
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeRouserceFeatures,
  },
  {
    resource: Category,
    options: categoryResourceOptions,
  },
  {
    resource: User,
    options: userResourceOptions,
  },
];
