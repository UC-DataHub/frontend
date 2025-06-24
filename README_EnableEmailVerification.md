To enable email verification:
  1) FileTreeSelector - uncomment part in handleDownload
  2) DatasetList - uncomment onClick inside Upload section
  3) Header/index.jsx - uncomment last part of the component
  4) views.py -> RegisterView uncomment send_email_verification()
  5) views.py -> download_selection() - uncomment email verification check
  6) views.py -> upload_folder() - uncomment email verification check
