import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

export const Route = createFileRoute("/posts/")({
	component: RouteComponent,
});

function RouteComponent() {
	const posthog = usePostHog();

	useEffect(() => {
		posthog.logger.info("posts_index_viewed", {
			route: "/posts/",
		});
	}, [posthog]);

	return <div>Hello "/posts/"!</div>;
}
