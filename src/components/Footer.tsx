export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-neutral-800 bg-black px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <h3 className="font-mono text-xl font-bold text-white">
              CogniLeads Systems
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              We sync work and forge systems.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <h4 className="mb-3 font-semibold text-white">Contact</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a
                    href="mailto:contact@vectrasyn.com"
                    className="hover:text-green-400"
                  >
                    contact@vectrasyn.com
                  </a>
                </li>
                <li>Hyderabad, Telangana, India</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-white">Services</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>AI SDR Pipelines</li>
                <li>Multi-Agent Automation</li>
                <li>GEO / AEO</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-900 pt-6 text-xs text-neutral-500">
          © {year} CogniLeads Systems. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
