module "governance_db" {
  source = "./modules/database"

  db_name = "policy_library_metadata"
}

module "policy_queue" {
  source = "./modules/redis"

  cluster_mode = false
}

module "compliance_monitoring" {
  source = "./modules/monitoring"

  retention_days = 90
}

resource "kubernetes_namespace" "governance" {
  metadata {
    name = "enterprise-governance"
  }
}

resource "kubernetes_config_map" "global_policies" {
  metadata {
    name      = "global-governance-policies"
    namespace = kubernetes_namespace.governance.metadata[0].name
  }

  data = {
    "s3-baseline.json" = jsonencode({
      version = "1.2.0"
      rules   = ["no-public-read", "encryption-enforced"]
    })
  }
}
