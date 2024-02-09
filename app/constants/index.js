export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/groups",
    label: "Groups",
  },
  {
    imgURL: "/assets/task.svg",
    route: "/tasks",
    label: "Tasks",
  },
  {
    imgURL: "/assets/shopping.svg",
    route: "/shopping",
    label: "Shopping Lists",
  },
  {
    imgURL: "/assets/calendar.svg",
    route: "/events",
    label: "Events",
  },
  {
    imgURL: "/assets/activity.svg",
    route: "/activities",
    label: "Activity",
  },

  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
  
];

export const profileTabs = [
  { value: "posts", label: "Posts", icon: "/assets/reply.svg" },
  { value: "tasks", label: "Tasks", icon: "/assets/task.svg" },
  { value: "lists", label: "Shopping Lists", icon: "/assets/shopping.svg" },
  { value: "events", label: "Events", icon: "/assets/calendar.svg" },
];

export const tasksTabs = [
  { value: "To do", label: "To do", icon: "/assets/reply.svg" },
  { value: "Doing", label: "Doing", icon: "/assets/members.svg" },
  { value: "Done", label: "Done", icon: "/assets/tag.svg" },
  
];

export const listsTabs = [
  { value: "Not Completed", label: "Not Completed", icon: "/assets/reply.svg" },
  { value: "Completed", label: "Completed", icon: "/assets/members.svg" }, 
];

export const memberItems = [
  { src: "/assets/reply.svg", alt: "Posts", key: "posts" },
  { src: "/assets/members.svg", alt: "Tasks", key: "tasks" },
  { src: "/assets/membersCalendar.svg", alt: "Events", key: "events" },
  { src: "/assets/tag.svg", alt: "Lists", key: "lists" },
];