import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { PostHogProvider } from "posthog-js/react";

import { PostHogLogCapture } from "../components/PostHogLogCapture";
import appCss from "../styles.css?url";

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

if (import.meta.env.DEV && !posthogKey) {
	throw new Error(
		"VITE_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
	);
}

if (import.meta.env.DEV && !posthogHost) {
	throw new Error(
		"VITE_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_HOST is configured",
	);
}

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{posthogKey && posthogHost ? (
					<PostHogProvider
						apiKey={posthogKey}
						options={{
							api_host: posthogHost,
							defaults: "2025-05-24",
							capture_exceptions: true,
							debug: import.meta.env.DEV,
							logs: {
								serviceName: "tanstack-start-web",
								environment: import.meta.env.MODE,
							},
						}}
					>
						<PostHogLogCapture />
						{children}
						<TanStackDevtools
							config={{
								position: "bottom-right",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
							]}
						/>
					</PostHogProvider>
				) : (
					<>
						{children}
						<TanStackDevtools
							config={{
								position: "bottom-right",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
							]}
						/>
					</>
				)}
				<Scripts />
			</body>
		</html>
	);
}
