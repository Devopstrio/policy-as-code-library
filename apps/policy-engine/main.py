import json
from typing import List, Dict, Any

class PolicyEngine:
    """Core engine for evaluating resources against JSON/YAML policy definitions."""
    
    def __init__(self):
        self.policy_library = {}

    def load_policy(self, policy_id: str, definition: Dict):
        self.policy_library[policy_id] = definition

    def evaluate(self, resource_type: str, resource_data: Dict[str, Any]) -> List[Dict]:
        results = []
        for pid, policy in self.policy_library.items():
            if policy["resource_type"] != resource_type:
                continue
                
            compliant = self._run_logic(policy["rules"], resource_data)
            results.append({
                "policy_id": pid,
                "name": policy["name"],
                "compliant": compliant,
                "mode": policy["mode"],
                "severity": policy["severity"],
                "message": policy["violation_message"] if not compliant else "Compliant"
            })
        return results

    def _run_logic(self, rules: List[Dict], data: Dict) -> bool:
        """Simulates OPA-like logic evaluation."""
        for rule in rules:
            target = data.get(rule["field"])
            op = rule["operator"]
            val = rule["value"]
            
            if op == "eq" and target != val: return False
            if op == "neq" and target == val: return False
            if op == "contains" and val not in target: return False
            if op == "not_contains" and val in target: return False
            
        return True

if __name__ == "__main__":
    engine = PolicyEngine()
    
    # Sample S3 Bucket Policy
    s3_policy = {
        "name": "Block Public S3 Access",
        "resource_type": "AWS::S3::Bucket",
        "mode": "PREVENTIVE",
        "severity": "CRITICAL",
        "violation_message": "S3 bucket must have PublicAccessBlock enabled.",
        "rules": [
            {"field": "public_access_block", "operator": "eq", "value": True}
        ]
    }
    
    engine.load_policy("p-001", s3_policy)
    
    # Mock Non-Compliant Resource
    mock_resource = {
        "name": "my-public-bucket",
        "public_access_block": False
    }
    
    results = engine.evaluate("AWS::S3::Bucket", mock_resource)
    print(f"Policy Evaluation Results: {json.dumps(results, indent=2)}")
