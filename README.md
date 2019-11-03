Arquitectura

# TOOLS

## AWS CLI

brew install awscli

## KUBECTL

brew install kubernetes-cli

## KOPS

brew update && brew install kops

## KUBECTX

brew install kubectx

## K9s

brew install derailed/k9s/k9s

# CONFIG CLUSTER

aws ec2 create-key-pair --key-name ripley-test | jq -r '.KeyMaterial' > ripley-test.pem
mv ripley-test.pem ~/.ssh/
chmod 400 ~/.ssh/ripley-test.pem
ssh-keygen -y -f ~/.ssh/ripley-test.pem > ~/.ssh/ripley-test.pub

export AWS_REGION=us-east-1
export NAME=rtest.k8s.local
export KOPS_STATE_STORE=s3://rtest.k8s.local

# CREATE CLUSTER

kops create cluster \
--cloud aws \
--networking kubenet \
--name \rtest.k8s.local \
--master-size t2.medium \
--node-size t2.medium \
--zones us-east-1a \
--ssh-public-key ~/.ssh/ripley-test.pub \
--state s3://rtest.k8s.local \
--yes

kops validate cluster
kubectl get nodes

# UPDATE MAX NODES

kops edit ig nodes --state=s3://rtest.k8s.local
kops update cluster --state=s3://rtest.k8s.local --yes

# ADD METRICS SERVICE

kubectl apply -f tools/metrics-server

kops edit cluster rtest.k8s.local --state=s3://rtest.k8s.local

ADD

```
 kubelet:
    anonymousAuth: false
    authenticationTokenWebhook: true
    authorizationMode: Webhook
```

kops update cluster --state=s3://rtest.k8s.local --yes
kops rolling-update cluster --state=s3://rtest.k8s.local --yes
kubectl apply -f tools/admin-role

# EDIT KUBE API SERVER

kops edit cluster rtest.k8s.local --state=s3://rtest.k8s.local

ADD

```
kubeAPIServer:
    admissionControl:
    - NamespaceLifecycle
    - LimitRanger
    - ServiceAccount
    - PersistentVolumeLabel
    - DefaultStorageClass
    - DefaultTolerationSeconds
    - MutatingAdmissionWebhook
    - ValidatingAdmissionWebhook
    - ResourceQuota
    - NodeRestriction
    - Priority
```

kops update cluster --state=s3://rtest.k8s.local --yes
kops rolling-update cluster --state=s3://rtest.k8s.local --yes

# ISTIO (THIS INSTALLATION IS NOT RECOMMENDED FOR PRODUCTION!!)

```
for i in tools/istio/install/kubernetes/helm/istio-init/files/crd*yaml; do kubectl apply -f $i; done
```

```
kubectl apply -f tools/istio/install/kubernetes/istio-demo.yaml
```

kubectl get svc -n istio-system
kubectl get pods -n istio-system

# PD: FOR PRODUCTION USE HELM INSTALL

# APPLICATION

```
kubectl label namespace default istio-injection=enabled
```

```
kubectl apply -f istio-manifests
```

```
kubectl apply -f kubernetes-manifests
```

# PROMETHEUS

```
make p
```

# GRAFANA

```
make g
```

# JAEGER

```
make j
```

# KIALI

```
make k
```

# KIBANA

```
make ki
```

# DELETE

kops delete cluster --state=s3://rtest.k8s.local --name=rtest.k8s.local --yes
