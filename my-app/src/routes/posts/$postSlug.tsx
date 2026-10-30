import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

export const Route = createFileRoute("/posts/$postSlug")({
	component: RouteComponent,
});

function RouteComponent() {
	const { postSlug } = Route.useParams();
	const posthog = usePostHog();

	useEffect(() => {
		if (postSlug) {
			posthog.logger.info("post_detail_viewed", {
				route: "/posts/$postSlug",
			});
		}
	}, [posthog, postSlug]);

	console.log(postSlug);
	return <div>Post {postSlug}</div>;
}
