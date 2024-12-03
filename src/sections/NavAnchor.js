
export default function NavAnchor() {
    return (
        <div>
            <main className="container py-4">
                <section>
                    <nav className="d-flex gap-3 align-items-center">
                        <a href="/super-admin/roles" className="btn btn-outline-primary">
                            Roles
                        </a>
                        <a href="/super-admin/permissions" className="btn btn-outline-secondary">
                            Permissions
                        </a>
                        <a href="/users" className="btn btn-outline-success">
                            Users
                        </a>
                    </nav>
                </section>
            </main>
        </div>
    );
}
