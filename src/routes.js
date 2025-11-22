import Dashboard from "views/Dashboard.jsx";
import Users from "components/User/Index";
import Category from "components/Category/Index";
import Athelete from "components/Athelete/Index";
import DifficultyLevel from "components/Difficulty-level/Index";
import SpeedLevel from "components/Speed-level/Index";
import Drill from "components/Drills/Index";
import Subscription from "components/Subscription/Index";
import DrillVideo from "components/Drills-video/Index";

const dashboardRoutes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		icon: "pe-7s-graph",
		component: Dashboard,
		layout: "/admin",
		isShow: true,
	},
	{
		path: "/users",
		name: "User",
		icon: "pe-7s-user",
		component: Users,
		layout: "/admin",
		isShow: true,
	},
	{
		path: "/categories",
		name: "Categories",
		icon: "pe-7s-back-2",
		component: Category,
		layout: "/admin",
		isShow: true,
	},
	{
		path: "/atheletes",
		name: "Atheletes",
		icon: "pe-7s-add-user",
		component: Athelete,
		layout: "/admin",
		isShow: true,
	},
	{
		path: "/difficulty-levels",
		name: "Difficulty Levels",
		icon: "pe-7s-edit",
		component: DifficultyLevel,
		layout: "/admin",
		isShow: true,
	},
	{
		path: "/speed-levels",
		name: "Speed Levels",
		icon: "pe-7s-edit",
		component: SpeedLevel,
		layout: "/admin",
		isShow: true,
	},
	{
		path: "/drills",
		name: "Drills",
		icon: "pe-7s-albums",
		component: Drill,
		layout: "/admin",
		isShow: true,
	},
	{
		path: "/drills/videos/:id",
		name: "Drills Videos",
		icon: "pe-7s-albums",
		component: DrillVideo,
		layout: "/admin",
		isShow: false,
	},
	{
		path: "/subscriptions",
		name: "Subscription",
		icon: "pe-7s-cash",
		component: Subscription,
		layout: "/admin",
		isShow: true,
	},
];

export default dashboardRoutes;
