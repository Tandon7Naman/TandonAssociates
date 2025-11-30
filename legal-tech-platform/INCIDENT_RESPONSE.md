# 🚨 Security Incident Response Plan

## Incident Classification

### Critical (Immediate Action Required)
- Data breach confirmed
- System compromise
- Unauthorized access to sensitive data
- Ransomware attack
- DDoS attack

### High (Urgent Action Required)
- Failed login attempts > 100 in 1 hour
- Unauthorized API access
- File upload vulnerability exploited
- Rate limit bypass detected

### Medium (Action Required)
- Failed login attempts > 50 in 1 hour
- Suspicious activity pattern
- Configuration drift detected
- Dependency vulnerability found

### Low (Monitor)
- Single failed login attempt
- Unusual but not suspicious activity
- Minor configuration issue

## Incident Response Workflow

### 1. Detection & Alerting

#### Automated Alerts
- Failed login attempts > 10 in 5 minutes
- Rate limit exceeded > 50 times in 5 minutes
- Unauthorized access attempts > 5 in 5 minutes
- Database connection errors
- API error rate > 1%
- Response time > 5 seconds

#### Manual Detection
- Security team review of logs
- User reports
- Third-party notifications
- Monitoring dashboard review

### 2. Initial Response (0-15 minutes)

#### Immediate Actions
```bash
# 1. Acknowledge incident
echo "Incident acknowledged at $(date)" >> /var/log/incident.log

# 2. Gather initial information
- What happened?
- When did it happen?
- Who reported it?
- What systems affected?
- What data potentially exposed?

# 3. Notify incident commander
- Contact: [Security Lead]
- Method: [Email/Slack/Phone]
- Include: Incident type, severity, initial findings

# 4. Begin incident log
- Timestamp
- Reporter
- Initial description
- Severity assessment
- Actions taken
```

#### Containment (If Breach Suspected)
```bash
# 1. Revoke all active sessions
# 2. Disable affected user accounts
# 3. Enable enhanced logging
# 4. Isolate affected systems
# 5. Preserve evidence
```

### 3. Investigation (15 minutes - 2 hours)

#### Log Analysis
```bash
# Check authentication logs
grep "UNAUTHORIZED_ACCESS" /var/log/security.log | tail -100

# Check rate limit events
grep "RATE_LIMIT_EXCEEDED" /var/log/security.log | tail -100

# Check failed logins
grep "LOGIN_FAILED" /var/log/security.log | tail -100

# Check database access
grep "DATABASE" /var/log/app.log | tail -100

# Check API errors
grep "ERROR" /var/log/api.log | tail -100
```

#### Questions to Answer
- [ ] What was the attack vector?
- [ ] When did it start?
- [ ] How long was it active?
- [ ] What data was accessed?
- [ ] How many users affected?
- [ ] What systems compromised?
- [ ] Root cause identified?

#### Evidence Collection
```bash
# Preserve logs
cp /var/log/security.log /evidence/security.log.$(date +%s)
cp /var/log/app.log /evidence/app.log.$(date +%s)
cp /var/log/database.log /evidence/database.log.$(date +%s)

# Database snapshot
pg_dump -U postgres legal_tech > /evidence/db_backup.sql

# System state
ps aux > /evidence/processes.txt
netstat -an > /evidence/connections.txt
```

### 4. Remediation (2-4 hours)

#### For Authentication Breach
```bash
# 1. Rotate all credentials
- Database password
- API keys
- NEXTAUTH_SECRET
- Service account passwords

# 2. Reset affected user passwords
- Force password reset on next login
- Send notification to users

# 3. Review access logs
- Identify unauthorized access
- Determine scope of breach

# 4. Deploy security patches
- Update vulnerable dependencies
- Deploy code fixes
- Restart services
```

#### For Data Breach
```bash
# 1. Identify exposed data
- What records accessed?
- What fields exposed?
- How many users affected?

# 2. Notify affected users
- Send breach notification
- Provide remediation steps
- Offer credit monitoring if applicable

# 3. Notify regulators
- GDPR: Within 72 hours
- CCPA: Without unreasonable delay
- Other: Per jurisdiction requirements

# 4. Preserve evidence
- Keep all logs
- Document timeline
- Record all actions taken
```

#### For System Compromise
```bash
# 1. Isolate affected systems
- Disconnect from network
- Preserve for forensics

# 2. Rebuild systems
- Restore from clean backup
- Apply security patches
- Verify integrity

# 3. Restore services
- Bring systems back online
- Monitor for recurrence
- Verify functionality
```

### 5. Recovery (4-24 hours)

#### System Recovery
```bash
# 1. Verify system integrity
- Run security scans
- Check file integrity
- Verify configurations

# 2. Restore services
- Bring systems online
- Verify functionality
- Monitor performance

# 3. Validate fixes
- Test security controls
- Verify patches applied
- Confirm vulnerabilities closed
```

#### User Communication
```bash
# 1. Notify users
- Explain what happened
- What data was affected
- What steps taken
- What users should do

# 2. Provide support
- Answer questions
- Provide remediation steps
- Offer assistance

# 3. Update status
- Regular updates
- Transparency
- Timeline for resolution
```

### 6. Post-Incident (24+ hours)

#### Incident Report
```markdown
# Incident Report

## Executive Summary
- Incident type: [Type]
- Severity: [Critical/High/Medium/Low]
- Duration: [Start time] to [End time]
- Users affected: [Number]
- Data exposed: [Description]

## Timeline
- [Time]: Event occurred
- [Time]: Detected
- [Time]: Contained
- [Time]: Remediated
- [Time]: Resolved

## Root Cause
[Description of root cause]

## Impact
- Systems affected: [List]
- Users affected: [Number]
- Data exposed: [Description]
- Business impact: [Description]

## Remediation
- [Action 1]
- [Action 2]
- [Action 3]

## Prevention
- [Preventive measure 1]
- [Preventive measure 2]
- [Preventive measure 3]

## Lessons Learned
- [Lesson 1]
- [Lesson 2]
- [Lesson 3]

## Follow-up Actions
- [ ] Action 1 - Owner: [Name] - Due: [Date]
- [ ] Action 2 - Owner: [Name] - Due: [Date]
- [ ] Action 3 - Owner: [Name] - Due: [Date]
```

#### Improvements
```bash
# 1. Update security controls
- Implement new monitoring
- Enhance detection
- Improve response procedures

# 2. Update documentation
- Update incident response plan
- Update security procedures
- Update runbooks

# 3. Training
- Train team on incident
- Update security training
- Conduct tabletop exercise

# 4. Testing
- Test new controls
- Verify improvements
- Document results
```

## Incident Response Team

### Roles & Responsibilities

| Role | Name | Contact | Backup |
|------|------|---------|--------|
| Incident Commander | [Name] | [Contact] | [Backup] |
| Security Lead | [Name] | [Contact] | [Backup] |
| Database Admin | [Name] | [Contact] | [Backup] |
| DevOps Lead | [Name] | [Contact] | [Backup] |
| Legal/Compliance | [Name] | [Contact] | [Backup] |
| Communications | [Name] | [Contact] | [Backup] |

### Escalation Path
1. Security team detects issue
2. Incident commander notified
3. Response team assembled
4. Executive leadership notified (if critical)
5. Legal/compliance notified (if data breach)
6. Customers notified (if required)

## Communication Templates

### Internal Alert
```
SECURITY ALERT - [Severity]

Incident: [Description]
Time: [Time]
Status: [Investigating/Contained/Resolved]
Impact: [Description]
Next Update: [Time]

Contact: [Incident Commander]
```

### User Notification
```
Dear [User],

We are writing to inform you of a security incident that may have affected your account.

What happened:
[Description of incident]

What we did:
[Actions taken]

What you should do:
[Recommended actions]

For more information:
[Support contact]

Sincerely,
[Company] Security Team
```

### Regulatory Notification
```
[Regulatory Body],

We are notifying you of a data breach as required by [Regulation].

Incident Details:
- Date: [Date]
- Type: [Type]
- Records affected: [Number]
- Data exposed: [Description]

Notification Details:
- Affected individuals: [Number]
- Notification method: [Method]
- Notification date: [Date]

Remediation:
[Description of remediation]

Contact: [Contact information]
```

## Incident Response Checklist

### Detection Phase
- [ ] Alert received
- [ ] Severity assessed
- [ ] Incident commander notified
- [ ] Response team assembled
- [ ] Incident log started

### Investigation Phase
- [ ] Initial assessment completed
- [ ] Logs collected
- [ ] Evidence preserved
- [ ] Root cause identified
- [ ] Scope determined

### Containment Phase
- [ ] Affected systems isolated
- [ ] Credentials rotated
- [ ] Sessions revoked
- [ ] Access restricted
- [ ] Monitoring enhanced

### Remediation Phase
- [ ] Vulnerabilities patched
- [ ] Systems hardened
- [ ] Credentials updated
- [ ] Access restored
- [ ] Verification completed

### Recovery Phase
- [ ] Systems restored
- [ ] Services verified
- [ ] Performance monitored
- [ ] Users notified
- [ ] Status updated

### Post-Incident Phase
- [ ] Report completed
- [ ] Lessons learned documented
- [ ] Improvements implemented
- [ ] Training conducted
- [ ] Follow-up actions assigned

## Resources

### Tools
- Log aggregation: [Tool]
- Monitoring: [Tool]
- Forensics: [Tool]
- Communication: [Tool]

### Documentation
- Security policies: [Location]
- Runbooks: [Location]
- Contact list: [Location]
- Backup procedures: [Location]

### External Resources
- Legal counsel: [Contact]
- Incident response firm: [Contact]
- Law enforcement: [Contact]
- Regulatory bodies: [Contact]

## Testing & Drills

### Quarterly Tabletop Exercise
- Simulate incident scenario
- Test response procedures
- Identify gaps
- Update procedures

### Annual Penetration Test
- Identify vulnerabilities
- Test detection capabilities
- Verify response procedures
- Document findings

### Monthly Log Review
- Review security logs
- Identify patterns
- Test alerting
- Verify monitoring
