import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
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
		icon: "pe-7s-user",
		component: Category,
		layout: "/admin",
	},
	{
		path: "/atheletes",
		name: "Atheletes",
		icon: "pe-7s-user",
		component: Athelete,
		layout: "/admin",
	},
	{
		path: "/difficulty-levels",
		name: "Difficulty Levels",
		icon: "pe-7s-user",
		component: DifficultyLevel,
		layout: "/admin",
	},
	{
		path: "/speed-levels",
		name: "Speed Levels",
		icon: "pe-7s-user",
		component: SpeedLevel,
		layout: "/admin",
	},
	{
		path: "/drills",
		name: "Drills",
		icon: "pe-7s-user",
		component: Drill,
		layout: "/admin",
	},
	{
		path: "/user-form",
		name: "User Profile",
		icon: "pe-7s-user",
		component: UserProfile,
		layout: "/admin",
	},
	{
		path: "/table",
		name: "Table List",
		icon: "pe-7s-note2",
		component: TableList,
		layout: "/admin",
	},
	{
		path: "/icons",
		name: "Icons",
		icon: "pe-7s-science",
		component: Icons,
		layout: "/admin",
	},
	{
		path: "/maps",
		name: "Maps",
		icon: "pe-7s-map-marker",
		component: Maps,
		layout: "/admin",
	},
	{
		path: "/notifications",
		name: "Notifications",
		icon: "pe-7s-bell",
		component: Notifications,
		layout: "/admin",
	},
];

export default dashboardRoutes;
