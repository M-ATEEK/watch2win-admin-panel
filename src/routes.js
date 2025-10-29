import Dashboard from "views/Dashboard.jsx";
import Users from "components/User/Index";
import Category from "components/Category/Index";
import Athelete from "components/Athelete/Index";
import DifficultyLevel from "components/Difficulty-level/Index";
import SpeedLevel from "components/Speed-level/Index";
import Drill from "components/Drills/Index";

const dashboardRoutes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		icon: "pe-7s-graph",
		component: Dashboard,
		layout: "/admin",
	},
	{
		path: "/users",
		name: "User",
		icon: "pe-7s-user",
		component: Users,
		layout: "/admin",
	},
	{
		path: "/categories",
		name: "Categories",
		icon: "pe-7s-back-2",
		component: Category,
		layout: "/admin",
	},
	{
		path: "/atheletes",
		name: "Atheletes",
		icon: "pe-7s-add-user",
		component: Athelete,
		layout: "/admin",
	},
	{
		path: "/difficulty-levels",
		name: "Difficulty Levels",
		icon: "pe-7s-edit",
		component: DifficultyLevel,
		layout: "/admin",
	},
	{
		path: "/speed-levels",
		name: "Speed Levels",
		icon: "pe-7s-edit",
		component: SpeedLevel,
		layout: "/admin",
	},
	{
		path: "/drills",
		name: "Drills",
		icon: "pe-7s-albums",
		component: Drill,
		layout: "/admin",
	},
];

export default dashboardRoutes;
