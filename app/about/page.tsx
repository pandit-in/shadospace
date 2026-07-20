export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="space-y-16">
        <header className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Building the Future of Learning, Creating, and Growing
          </h1>

          <p className="text-lg text-muted-foreground">
            Welcome to <strong>Shadospace</strong> — a platform built for
            developers, creators, students, freelancers, and lifelong learners
            who want more than just another blog or social network.
          </p>

          <p className="text-muted-foreground">
            Our mission is to create a place where people can{" "}
            <strong>
              learn new skills, share knowledge, showcase their work, and
              discover opportunities
            </strong>{" "}
            — all in one ecosystem.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Why Shadospace?</h2>

          <p className="text-muted-foreground">
            The internet is filled with incredible resources, but they&apos;re
            spread across countless platforms. You read tutorials on one
            website, publish articles on another, showcase projects somewhere
            else, and search for jobs on yet another platform.
          </p>

          <p className="text-muted-foreground">
            Shadospace brings these experiences together into a single,
            connected ecosystem where learning, creating, and growing happen in
            one place.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">What You&apos;ll Find</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Technical articles & tutorials",
              "Programming guides & documentation",
              "Community discussions",
              "Project showcases",
              "Developer portfolios",
              "Career resources & opportunities",
              "AI-powered productivity tools",
              "Learning resources for everyone",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border p-5 transition-colors hover:bg-muted/50"
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Our Vision</h2>

          <p className="text-muted-foreground">
            We believe knowledge should be accessible, practical, and
            collaborative.
          </p>

          <p className="text-muted-foreground">
            Our vision is to build an open platform where anyone can learn,
            create, share, build an online presence, discover opportunities, and
            leverage AI to become more productive.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Our Values</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Quality First",
                description:
                  "We encourage thoughtful, accurate, and valuable content that helps people solve real-world problems.",
              },
              {
                title: "Community Driven",
                description:
                  "Great ideas grow through collaboration. Everyone has something worth sharing.",
              },
              {
                title: "Continuous Learning",
                description:
                  "Technology evolves every day, and learning should never stop.",
              },
              {
                title: "Open Innovation",
                description:
                  "We embrace open-source software, modern technologies, and AI to empower creators.",
              },
            ].map((value) => (
              <div key={value.title} className="rounded-xl border p-6">
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Why We Built Shadospace</h2>

          <blockquote className="border-l-4 pl-6 text-xl font-medium italic">
            &qoute;Learning, creating, and growing shouldn&apos;t require
            jumping between dozens of different platforms.&qoute;
          </blockquote>

          <p className="text-muted-foreground">
            We&apos;re building a space where knowledge, creativity, community,
            and opportunity come together to help people achieve more.
          </p>
        </section>

        <section className="rounded-2xl border bg-muted/30 p-10 text-center">
          <h2 className="text-3xl font-bold">Join the Journey</h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Shadospace is continuously evolving, and we&apos;re just getting
            started. Whether you&apos;re here to learn, write, build, teach, or
            explore, we&apos;re excited to have you as part of our growing
            community.
          </p>

          <p className="mt-8 text-lg font-medium">Build. Learn. Share. Grow.</p>
        </section>
      </div>
    </main>
  )
}
